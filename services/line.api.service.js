const usersService = require('./user.service');
const groupsService = require('./group.service');

const lineApi = require('../config/api');

exports.getGroupSummary = async (groupId) => {
  const { data } = await lineApi.get(`/group/${groupId}/summary`);
  return data.groupName;
};

exports.getGroupMember = async (groupId, userId) => {
  const { data } = await lineApi.get(`/group/${groupId}/member/${userId}`);
  return data.displayName;
};
