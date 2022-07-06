const express = require('express');
const path = require('path');

const app = express();
 
const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
};
app.use(express.static('./dist/cualo-port-v1'));
 
app.get('/*', function (req, res) {
  res.sendFile(path.join('index.html','/dist/cualo-port-v1/'));
});
 
app.use(forceSSL());
 
app.listen(process.env.PORT || 8080);