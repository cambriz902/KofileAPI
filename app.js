const app = require('express')();
const routes = require('./routes');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/', routes);

let server = app.listen(4000, () => {
  let port = server.address().port;
  console.log(`Running on localhost:${port}`);
});

module.exports = server;
