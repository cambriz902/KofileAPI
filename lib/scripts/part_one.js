const orders_data = require('./orders.json');
const fees_and_distributions_data = require('../../data/fees.json');

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
  
function orderFees(order) {
  let order_price_info = { 
    "order_id": order.order_number,
    "items_type_price": [],
    "order_total": 0
  };
  let total_price = 0;
  let order_items = order.order_items;
  let number_of_items = order_items.length;
  for(let item_index = 0; item_index < number_of_items; item_index++) {
    let item = order_items[item_index];
    let item_type = item.type;
    let item_price = itemTotalPrice(item_type, item.pages);
    total_price += item_price;
    order_price_info.items_type_price.push({
      "type": item_type,
      "price": item_price
    });
  }
   order_price_info.order_total = total_price;
   return order_price_info;
}

function printOrderFormat(order_info) {
  let output = `Order ID: ${order_info.order_id}\n`;
  let items_info = order_info.items_type_price;
  for(let index = 0; index < items_info.length; index++){
    let item_type = items_info[index].type;
    let item_price = items_info[index].price;
    output += `  Order item ${item_type}: $${item_price}\n`;
  }
  output += `  Order total: $${order_info.order_total}\n`;
  return output;
}

function printOrdersFees(orders) {
  for(let current_order = 0; current_order < orders.length; current_order++) {
    let order_info = orderFees(orders[current_order]);
    console.log(printOrderFormat(order_info));
  }
  return; 
}

printOrdersFees(orders_data);