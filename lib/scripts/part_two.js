const orders_data = require('./orders.json');
const fees_and_distributions_data = require('../../data/fees.json');
let all_funds_distribution = [];

function itemTotalPrice(type, pages) {
  let order_type_data = fees_and_distributions_data.filter((data) => {
    return data.order_item_type == type;
  })[0];
  let fees = order_type_data.fees;
  let number_of_fees = order_type_data.fees.length;
  let total_price = 0.00;
  for(let fee_index = 0; fee_index < number_of_fees; fee_index++) {
    let curr_fee = fees[fee_index];
    if(curr_fee.type == 'flat') {
      total_price += parseFloat(curr_fee.amount);
    } else {
      total_price += parseFloat(curr_fee.amount * (pages-1));
    }
  }
  return total_price;
}

function updateOrderFunds(updated_funds_data, distribution_name, distribution_amount, item_price) {
  let index = -1;
  for(let i = 0; i < updated_funds_data.length; i++){
    if(updated_funds_data[i].name == distribution_name){
      index = i; 
      break;
    }
  }
  if(index != -1) {
    updated_funds_data[index].amount = updated_funds_data[index].amount + distribution_amount;
  } else {
    updated_funds_data.push({
      "name": distribution_name,
      "amount": distribution_amount
    });
  }
  return updated_funds_data;
}

function updateOtherFundAmount(updated_funds_data, item_price) {
  let other_index = -1;
  for(let i = 0; i < updated_funds_data.length; i++){
    if(updated_funds_data[i].name == 'Other'){
      other_index = i; 
      break;
    }
  }
  if(other_index != -1) {
    updated_funds_data[other_index].amount = updated_funds_data[other_index].amount + item_price;
  } else {
    updated_funds_data.push({
      "name": "Other",
      "amount": item_price
    });
  }
  return updated_funds_data;
}

function itemFundsDistribution(item_type, item_price, curr_funds_data) {
  let updated_funds_data = curr_funds_data;
  let order_type_data = fees_and_distributions_data.filter((data) => {
    return data.order_item_type == item_type;
  })[0];
  let distribution_data = order_type_data.distributions;
  let number_of_destributions = distribution_data.length;
  for(let distribution_index = 0; distribution_index < number_of_destributions; distribution_index++){
    let curr_distribution = distribution_data[distribution_index]
    let distribution_name = curr_distribution.name;
    let distribution_amount = parseFloat(curr_distribution.amount);
    updated_funds_data = updateOrderFunds(updated_funds_data, distribution_name, distribution_amount);
    all_funds_distribution = updateOrderFunds(all_funds_distribution, distribution_name, distribution_amount);
    item_price -= distribution_amount;

  }
  if(item_price > 0) {
    updated_funds_data = updateOtherFundAmount(updated_funds_data, item_price);
    all_funds_distribution = updateOtherFundAmount(all_funds_distribution, item_price);
  }
  return updated_funds_data;
}

function orderFundsInfo(order){
  let curr_funds_data = []
  let order_funds_info = {
    "order_id": order.order_number,
    "funds_info": curr_funds_data,
  };
  let order_items = order.order_items;
  let number_of_items = order_items.length;
  for(let item_index = 0; item_index < number_of_items; item_index++) {
    let item = order_items[item_index];
    let item_type = item.type;
    let item_price = itemTotalPrice(item_type, item.pages);
    let updated_funds_info = itemFundsDistribution(item_type, item_price, curr_funds_data);
    order_funds_info.funds_info = updated_funds_info;
  }
  return order_funds_info;
}

function fundDistributionFormat(order_funds_info) {
  output = `Order ID: ${order_funds_info.order_id}\n`;
  let funds_info = order_funds_info.funds_info;
  for(let fund_index = 0; fund_index < funds_info.length; fund_index++) {
    let fund = funds_info[fund_index];
    output += `  Fund - ${fund.name}: $${fund.amount}\n`;
  }
  return output;
}

function totalFundDistributionFormat() {
  output = `Total distributions:\n`;
  for(let fund_index = 0; fund_index < all_funds_distribution.length; fund_index++) {
    let fund = all_funds_distribution[fund_index];
    output += `  Fund - ${fund.name}: $${fund.amount}\n`;
  }
  return output;
}

function printFundDistribution(orders) {
  let orders_funds_distributions = [];
  for(let order_index = 0; order_index < orders.length; order_index++) {
    console.log(fundDistributionFormat(orderFundsInfo(orders[order_index])));
  }
  console.log(totalFundDistributionFormat());
  return; 
}

printFundDistribution(orders_data);