const ordersFundsDistributionProcessor = require('./services/ordersFundsDistributionProcessor');

module.exports = (req, res) => {
  const data = ordersFundsDistributionProcessor(req.body);
  res.status(200).json({ data });
};
