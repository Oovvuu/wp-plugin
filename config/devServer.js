const fs = require('fs');
const path = require('path');
const os = require('os');

module.exports = function getDevServer(mode, env) {
  const certPath = (env && env.certPath)
    ? env.certPath
    : path.join(
      os.homedir(),
      'broadway/config/nginx-config/certs',
    );
  const http = !! ((env && env.http)); // eslint-disable-line space-unary-ops

  switch (mode) {
    case 'development':
      return {
        hot: true,
        inline: false,
        quiet: false,
        noInfo: false,
        contentBase: '/build',
        disableHostCheck: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        host: '0.0.0.0',
        proxy: {
          '**': 'https://8080-httpsproxy.alley.test',
          changeOrigin: true,
        },
        stats: { colors: true },
        https: http ? false : {
          cert: fs.readFileSync(
            path.join(certPath, 'server.crt'),
            'utf8',
          ),
          key: fs.readFileSync(
            path.join(certPath, 'server.key'),
            'utf8',
          ),
        },
      };

    case 'production':
    default:
      return {};
  }
};
