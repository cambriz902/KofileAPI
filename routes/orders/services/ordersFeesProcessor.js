const fees_and_distributions_data = require('../../../data/fees.json');
const itemTotalPrice = require('./utils/itemTotalPrice');

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

module.exports = (orders) => {
  let processed_orders = [];
  for(let current_order = 0; current_order < orders.length; current_order++) {
    processed_orders.push(orderFees(orders[current_order]));
  }
  return processed_orders; 
};
