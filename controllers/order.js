const { Order, ProductCart } = require("../models/order");
const User = require('../models/user')
const product = require('../models/product')
exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "NO order found in DB"
        });
      }
      req.order = order;
      next();
      res.json(order)
    });
 
};

exports.createOrder = (req, res) => {
  let userId = req.params.userId
  let productId = req.params.productId
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in DB"
      });
    }
    res.redirect('/api/order/all/'+userId+'/'+productId)
  });
};

exports.getAllOrders = (req, res) => {
  let user = User.collection.find()
  let userId = req.params.userId
  let productId = req.params.productId
  Order.find()
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No orders found in DB"
        });
      }
      res.render('orders.ejs', {order: order})
      console.log(user)
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update order status"
        });
      }
      res.json(order);
    }
  );
};
