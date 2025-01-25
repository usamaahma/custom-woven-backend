const allRoles = {
  user: ['manageAccountAddress'],
  admin: ['getUsers', 'manageUsers', 'products', 'pendingCheckout', 'getCompletedOrder', 'manageCompletedOrder'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
