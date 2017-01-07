const fees_and_distributions_data = require('../../../../data/fees.json');
const findOrderTypeData = require('./findOrderTypeData');

module.exports = (item_type, pages) => {
  let order_type_data = findOrderTypeData(item_type);
  let fees = order_type_data.fees;
  let number_of_fees = order_type_data.fees.length;
  let total_price = 0.00;
  for(let fee_index = 0; fee_index < number_of_fees; fee_index++) {
    let fee = fees[fee_index];
    if(fee.type == 'flat') {
      total_price += parseFloat(fee.amount);
    } else {
      total_price += parseFloat(fee.amount * (pages-1));
    }
  }
  return total_price;
};
