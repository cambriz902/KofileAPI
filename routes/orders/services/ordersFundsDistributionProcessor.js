const fees_and_distributions_data = require('../../../data/fees.json');
const itemTotalPrice = require('./utils/itemTotalPrice');
const findOrderTypeData = require('./utils/findOrderTypeData');

let all_funds_distribution = {}

function updateFunds(funds_data, distribution_name, distribution_amount) {
  if(funds_data[distribution_name]) {
    funds_data[distribution_name] = (parseFloat(funds_data[distribution_name]) + parseFloat(distribution_amount)).toFixed(2);
  } else {
    funds_data[distribution_name] = parseFloat(distribution_amount).toFixed(2);
  }
  return funds_data;
}

function itemFundsDistribution(item_type, item_price, funds_data) {
  let order_type_data = findOrderTypeData(item_type);
  let distribution_data = order_type_data.distributions;
  let number_of_destributions = distribution_data.length;
  for(let distribution_index = 0; distribution_index < number_of_destributions; distribution_index++){
    let curr_distribution = distribution_data[distribution_index]
    let distribution_name = curr_distribution.name;
    let distribution_amount = parseFloat(curr_distribution.amount);
    funds_data = updateFunds(funds_data, distribution_name, distribution_amount);
    all_funds_distribution = updateFunds(all_funds_distribution, distribution_name, distribution_amount);
    item_price = (item_price - distribution_amount).toFixed(2);
  }
  if(item_price > 0){
    funds_data = updateFunds(funds_data, "other", item_price);
    all_funds_distribution = updateFunds(all_funds_distribution, "other", item_price);
  }
  return funds_data;
}

function orderFundsInfo(order){
  let order_funds = {
    "order_id": order.order_number,
    "funds_distribution": {},
  };
  let order_items = order.order_items;
  let number_of_items = order_items.length;
  for(let item_index = 0; item_index < number_of_items; item_index++) {
    let item = order_items[item_index];
    let item_type = item.type;
    let item_price = itemTotalPrice(item_type, item.pages);
    let updated_funds = itemFundsDistribution(
      item_type, 
      item_price, 
      order_funds.funds_distribution
    );
    order_funds.funds_distribution = updated_funds;
  }
  return order_funds;
}

module.exports = (orders) => {
  let orders_funds_distribution = {
    orders_distribution: [],
    total_distribution: null
  };
  for(let order_index = 0; order_index < orders.length; order_index++) {
    orders_funds_distribution.orders_distribution.push(orderFundsInfo(orders[order_index]));
  }
  orders_funds_distribution.total_distribution = all_funds_distribution;
  return orders_funds_distribution; 
};
