const ngrok = require('@ngrok/ngrok');

const domain = process.env.NGROK_DOMAIN;
const authtoken = process.env.NGROK_AUTHTOKEN;

const connectNgrok = async (port) => {
  return ngrok
    .connect({ addr: port, authtoken, domain })
    .then((listener) => {
      console.info(`[Ngrok] tunnel established at: ${listener.url()}`);
    })
    .catch((error) => {
      console.error('[Ngrok] failed to establish tunnel');
      throw error;
    });
};

module.exports = connectNgrok;
