const usersService = require('./user.service');
const groupsService = require('./group.service');
const lineApiService = require('./line.api.service');

exports.handleEvent = async (event) => {
  if (!event?.source) return;

  if (event.source.type !== 'group') return;

  const { groupId, userId } = event.source;

  if (!groupId || !userId) return;

  // 1) GROUP (find or create)
  let group = await groupsService.findByGroupId(groupId);
  if (!group) {
    const groupName = await lineApiService.getGroupSummary(groupId);
    group = await groupsService.create({ groupId, groupName });
  }

  // 2) USER (find or create)
  let user = await usersService.findByUserId(userId);
  if (!user) {
    const displayName = await lineApiService.getGroupMember(groupId, userId);
    user = await usersService.create({ userId, displayName });
  }

  // 3) RELATION
  await groupsService.addUserToGroup(user.id, group.id);
};