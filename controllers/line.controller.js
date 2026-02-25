const lineEventService = require('../services/line.event.service');

const { asyncHandler } = require('../middlewares');

exports.sendMessage = asyncHandler(async (req, res) => {
  res.json({ status: 'OK' });
});

exports.webhook = asyncHandler(async (req, res) => {
  const events = req.body?.events ?? [];

  if (!events.length) return res.sendStatus(200);

  for (const event of events || []) {
    await lineEventService.handleEvent(event);
  }

  res.sendStatus(200);
});
