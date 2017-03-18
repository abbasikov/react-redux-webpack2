const path = require('path');
const express = require('express');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
app.use(express.static('build'));

app.use('/assets/js',express.static(path.join(__dirname, 'source/assets/js')));
app.use('/assets/images',express.static(path.join(__dirname, 'source/assets/images')));


if (isDeveloping) {
  console.log('isDeveloping : true')
} else {
  console.log('isDeveloping : false');
  app.use(express.static(__dirname + '/'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
