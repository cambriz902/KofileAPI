const express = require('express');

const app = express();
const port = (process.env.PORT || 4000);

app.get('/notes', function(req, res) {
  res.json({notes: "this is your notebook."})
});

app.listen(port, () => console.log(`Running on localhost:${port}`));
