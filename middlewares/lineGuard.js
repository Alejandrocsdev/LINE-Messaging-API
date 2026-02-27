const crypto = require('crypto');

const lineGuard = (req, res, next) => {
  const channelSecret = process.env.LINE_CHANNEL_SECRET;
  const signature = req.headers['x-line-signature'];
  if (!signature) return res.sendStatus(401);

  const body = JSON.stringify(req.body);

  const expected = crypto
    .createHmac('sha256', channelSecret)
    .update(body)
    .digest('base64');

  if (signature !== expected) {
    return res.sendStatus(401);
  }

	console.log('LINE signature verified');

  next();
};

module.exports = lineGuard;
