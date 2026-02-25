const { Group, UserGroup } = require('../db/mysql/models');

exports.findAll = async () => {
  return Group.findAll();
};

exports.findByGroupId = async (groupId) => {
  return Group.findOne({ where: { groupId } });
};

exports.create = async (payload = {}) => {
  return Group.create(payload);
};

exports.addUserToGroup = async (userId, groupId) => {
  return UserGroup.findOrCreate({ where: { userId, groupId } });
};
