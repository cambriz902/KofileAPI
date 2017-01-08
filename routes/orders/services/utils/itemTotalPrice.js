const fees_and_distributions_data = require('../../../../data/fees.json');
const findOrderTypeData = require('./findOrderTypeData');

module.exports = (item_type, pages) => {
  let order_type_data = findOrderTypeData(item_type);
  let fees = order_type_data.fees;
  let number_of_fees = order_type_data.fees.length;
  let total_price = 0.00;
  for(let fee_index = 0; fee_index < number_of_fees; fee_index++) {
    let fee = fees[fee_index];
    let fee_amount = parseFloat(fee.amount);
    if(fee.type == 'flat') {
      total_price += fee_amount;
    } else {
      total_price += fee_amount * (pages-1);
    }
  }
  return total_price;
};
