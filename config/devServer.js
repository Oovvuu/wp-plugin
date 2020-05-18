const fs = require('fs');
const path = require('path');
const os = require('os');

module.exports = function getDevServer(mode) {
  switch (mode) {
    case 'development': {
      const { HTTPS_CERT_PATH, HTTPS_KEY_PATH } = process.env;
      let https = false;

      if (HTTPS_KEY_PATH && HTTPS_CERT_PATH) {
        const key = fs.readFileSync(
          path.join(os.homedir(), HTTPS_KEY_PATH),
          'utf8',
        );
        const cert = fs.readFileSync(
          path.join(os.homedir(), HTTPS_CERT_PATH),
          'utf8',
        );

        https = { cert, key };
      }

      return {
        hot: true,
        inline: false,
        quiet: false,
        noInfo: false,
        contentBase: '/build',
        disableHostCheck: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        host: '0.0.0.0',
        stats: { colors: true },
        https,
      };
    }

    case 'production':
    default:
      return {};
  }
};
