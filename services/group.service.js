const { Group, UserGroup } = require('../db/mysql/models');

exports.findAll = () => {
  return Group.findAll();
};

exports.findByGroupId = (groupId) => {
  return Group.findOne({ where: { groupId } });
};

exports.create = (payload = {}) => {
  return Group.create(payload);
};

exports.addUserToGroup = (userId, groupId) => {
  return UserGroup.findOrCreate({ where: { userId, groupId } });
};
