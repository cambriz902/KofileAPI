const app = require('express')();
const routes = require('./routes');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/', routes);

app.use(function (err, req, res, next) {
  res.status(404).send('We encountered a problem and are looking into it!')
  res.status(500).send(req.body)
});

let server = app.listen(4000, () => {
  let port = server.address().port;
  console.log(`Running on localhost:${port}`);
});

module.exports = server;
