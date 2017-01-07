const fees_and_distributions_data = require('../../../../data/fees.json');


module.exports = item_type => {
  const order_type_data = fees_and_distributions_data.find(data => {
    return data.order_item_type === item_type
  });
  return order_type_data;
};