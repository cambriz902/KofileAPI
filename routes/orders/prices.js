const ordersFeesProcessor = require('./services/ordersFeesProcessor');

module.exports = (req, res) => {
  const data = ordersFeesProcessor(req.body);
  res.status(200).json({ data });
};
