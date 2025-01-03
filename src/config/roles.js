const allRoles = {
  user: ['getAccountAddress', 'manageAccountAddress'],
  admin: ['getUsers', 'manageUsers', 'products', 'pendingCheckout'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
