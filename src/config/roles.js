const allRoles = {
  user: ['manageAccountAddress'],
  admin: [
    'getUsers',
    'manageSEO',
    'manageUsers',
    'products',
    'pendingCheckout',
    'getCompletedOrder',
    'manageCompletedOrder',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
