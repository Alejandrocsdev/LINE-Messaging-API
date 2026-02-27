const usersService = require('../services/user.service');
const groupsService = require('../services/group.service');
const lineApiService = require('../services/line.api.service');

const { asyncHandler } = require('../middlewares');

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await usersService.findAll();
  res.json({ users });
});

exports.getGroups = asyncHandler(async (req, res) => {
  const groups = await groupsService.findAll();
  res.json({ groups });
});

exports.sendMessage = asyncHandler(async (req, res) => {
  const { groupId, text } = req.body;

  const status = await lineApiService.pushMessage(groupId, text);

  if (status !== 200) {
    return res.status(500).json({ message: 'Failed to send Line message' });
  }

  res.json({ message: 'Line message sent successfully' });
});

exports.webhook = asyncHandler(async (req, res) => {
  console.log('Received webhook event:', JSON.stringify(req.body, null, 2));
  const { events } = req.body;

  for (const event of events || []) {
    if (!event?.source) return;

    if (event.source.type === 'group') {
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
        const displayName = await lineApiService.getGroupMember(
          groupId,
          userId,
        );
        user = await usersService.create({ userId, displayName });
      }

      // 3) RELATION
      await groupsService.addUserToGroup(user.id, group.id);
    }
  }

  res.sendStatus(200);
});
