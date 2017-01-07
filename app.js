const app = require('express')();
const routes = require('./routes');
const bodyParser = require('body-parser')

const port = (process.env.PORT || 4000);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/', routes);

app.listen(port, () => console.log(`Running on localhost:${port}`));
