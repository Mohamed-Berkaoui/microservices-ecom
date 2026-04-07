const { default: axios } = require("axios");
const orderModel = require("../models/order");
const { userServiceUrl, productServiceUrl } = require("../utils/servicesUrl");

async function createNewOrder(req, res, next) {
  //{order:[{productid}],userId:"kjhkjs"}
  try {
    const { userId, order } = req.body; //[{productId:"123",qty:2},{productid:"124",qty:5}]
    const response = await fetch(`${userServiceUrl}/infos/${userId}`);
    const userData = await response.json();
    if (!userData) {
      return res.status(400).json({ message: "user not found" });
    }

    try {
      await axios.post(`${productServiceUrl}/check-decrease`, { order });
    } catch (error) {
      throw new Error("unavalable product or unavailable quantity");
    }
    const newOrder = await orderModel.insertOne({ userId, order });
    // console.log("first")
    res.json({ data: newOrder });
  } catch (error) {
    next(error);
  }
}

async function getMyOrders(req, res, next) {
  try {
    const userId = req.params.userId;
    const userData = await axios.get(`${userServiceUrl}/infos/${userId}`);
    if (!userData) {
      return res.status(400).json({ message: "user not found" });
    }

    const userOrders = await orderModel.find({ userId });

    res.json({ data: userOrders });
  } catch (error) {
    next(error);
  }
}

module.exports = { createNewOrder, getMyOrders };
