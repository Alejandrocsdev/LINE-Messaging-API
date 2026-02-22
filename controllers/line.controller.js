const path = require('path');
const axios = require('axios');

const { asyncHandler } = require('../middlewares');

const { jsonDb: db } = require('../utils');

const USERS = path.join(__dirname, '../db/users.json');
const GROUPS = path.join(__dirname, '../db/groups.json');
const USERS_GROUPS = path.join(__dirname, '../db/users_groups.json');

const TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

exports.sendMessage = asyncHandler(async (req, res) => {
  res.json({ status: 'OK' });
});

exports.webhook = asyncHandler(async (req, res) => {
  const event = req.body.events?.[0];

  if (!event) return res.sendStatus(200);

  if (event.source.type !== 'group') {
    return res.sendStatus(200);
  }

  const { groupId, userId } = event.source;

  // ---- Load DB ----
  const users = await db.read(USERS);
  const groups = await db.read(GROUPS);
  const relations = await db.read(USERS_GROUPS);

  // ---- GROUP ----
  let group = groups.find((g) => g.groupId === groupId);

  if (!group) {
    const { data } = await axios.get(
      `https://api.line.me/v2/bot/group/${groupId}/summary`,
      { headers: { Authorization: `Bearer ${TOKEN}` } },
    );

    group = {
      id: groups.length + 1,
      groupId,
      groupName: data.groupName,
    };

    groups.push(group);
    await db.write(GROUPS, groups);
  }

  // ---- USER ----
  let user = users.find((u) => u.userId === userId);

  if (!user) {
    const { data } = await axios.get(
      `https://api.line.me/v2/bot/group/${groupId}/member/${userId}`,
      { headers: { Authorization: `Bearer ${TOKEN}` } },
    );

    user = {
      id: users.length + 1,
      userId,
      displayName: data.displayName,
    };

    users.push(user);
    await db.write(USERS, users);
  }

  // ---- RELATION ----
  const exists = relations.find(
    (r) => r.userId === user.id && r.groupId === group.id,
  );

  if (!exists) {
    relations.push({
      id: relations.length + 1,
      userId: user.id,
      groupId: group.id,
    });

    await db.write(USERS_GROUPS, relations);
  }

  res.sendStatus(200);
});
