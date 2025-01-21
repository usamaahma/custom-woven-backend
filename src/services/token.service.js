const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const config = require('../config/config');
const userService = require('./user.service');
const { Token } = require('../models');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
  await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (email) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
  }
  const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
  const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);
  await saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD);
  return resetPasswordToken;
};

/**
 * Generate a password reset token
 * @param {string} userId
 * @returns {string} Password reset token
 */
const generateResPasswordToken = (userId) => {
  const payload = {
    userId,
    type: tokenTypes.RESET_PASSWORD,
  };

  // Generate the reset password token (expires in 1 hour)
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};
/**
 * Generate verify email token
 * @param {User} user
 * @returns {Promise<string>}
 */
const generateVerifyEmailToken = async (user) => {
  const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
  const verifyEmailToken = generateToken(user.id, expires, tokenTypes.VERIFY_EMAIL);
  await saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);
  return verifyEmailToken;
};
/**
 * Verify the reset password token
 * @param {string} token
 * @returns {Promise<string>} User ID
 */
const verifyResPasswordToken = async (token) => {
  try {
    // console.log('Token received for verification:', token);

    // Verify the JWT token
    const decoded = jwt.verify(token, 'thisisasamplesecret'); // Replace with your secret key
    // console.log('Decoded Token:', decoded);

    if (decoded.type !== tokenTypes.RESET_PASSWORD) {
      // console.error('Invalid token type:', decoded.type);
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid reset password token');
    }

    // Fetch token record from the database to ensure it is valid and not expired
    const tokenRecord = await Token.findOne({
      token,
      type: tokenTypes.RESET_PASSWORD,
      expires: { $gt: Date.now() }, // Ensure token is not expired
    });

    if (!tokenRecord) {
      // console.error('Token not found or expired:', token);
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid or expired reset password token');
    }

    if (tokenRecord.blacklisted) {
      // console.error('Token is blacklisted:', token);
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid or expired reset password token');
    }

    // console.log('Token verified successfully for user ID:', decoded.sub);
    return decoded.sub; // Return the user ID from the decoded token
  } catch (error) {
    // console.error('Error verifying reset password token:', error.message);
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid or expired reset password token');
  }
};

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
  generateResPasswordToken,
  verifyResPasswordToken,
};
