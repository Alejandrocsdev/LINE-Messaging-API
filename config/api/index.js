const axios = require('axios');

const lineApi = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}` },
});

module.exports = lineApi;
