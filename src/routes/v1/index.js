const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const productRoute = require('./product.route');
const orderDescriptionRoute = require('./orderDescription.route');
const getQuoteRoute = require('./getQuote.route');
const hangtagRoute = require('./hangtag.route');
const docsRoute = require('./docs.route');
const blogsRoute = require('./blogs.route'); // <-- Corrected import for blogs route
const requestquoteRoute = require('./requestquote.route');
const pendingCheckoutRoute = require('./pendingCheckout.route');
const designQuoteRoute = require('./designQuote.route');
const checkoutRoute = require('./checkout.route');
const accountAddress = require('./accountAddress.route');
const NewsLetter = require('./newsletter.route');
const CompletedOrder = require('./completedOrder.route');
const SeoRoute = require('./seo.route');

// Add an empty line here as required by the rule

const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/orderdescription',
    route: orderDescriptionRoute,
  },
  {
    path: '/getquote',
    route: getQuoteRoute,
  },
  {
    path: '/hangtag',
    route: hangtagRoute,
  },
  {
    path: '/blogs', // Add blogs route here
    route: blogsRoute, // Ensure the `blogsRoute` is imported above
  },
  {
    path: '/requestquote',
    route: requestquoteRoute,
  },
  {
    path: '/pendingcheckout',
    route: pendingCheckoutRoute,
  },
  {
    path: '/designQuote',
    route: designQuoteRoute,
  },
  {
    path: '/checkout',
    route: checkoutRoute,
  },
  {
    path: '/accountaddress',
    route: accountAddress,
  },
  {
    path: '/newsletter',
    route: NewsLetter,
  },
  {
    path: '/completedorder',
    route: CompletedOrder,
  },
  {
    path: '/seo',
    route: SeoRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
