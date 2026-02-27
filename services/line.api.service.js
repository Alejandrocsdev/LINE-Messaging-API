const lineApi = require('../config/api');

exports.getGroupSummary = async (groupId) => {
  const { data } = await lineApi.get(`/group/${groupId}/summary`);
  return data.groupName;
};

exports.getGroupMember = async (groupId, userId) => {
  const { data } = await lineApi.get(`/group/${groupId}/member/${userId}`);
  return data.displayName;
};

exports.pushMessage = async (groupId, text) => {
  const body = { to: groupId, messages: [{ type: 'text', text }] };
  const { status } = await lineApi.post('/message/push', body);
  return status;
};
