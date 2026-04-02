const express = require("express");
const connectToDb = require("./utils/connectToDb");
const { createNewOrder, getAllOrders } = require("./controllers/order");

const app = express();

app.use(express.json());
app.post("/", createNewOrder);
app.get("/", getAllOrders);

app.all("*all", function (req, res) {
  res.json({ message: "404 not found" });
});
app.use(function (error, req, res, next) {
  res.status(500).json({ message: error.message });
});
app.listen(3003, function () {
  connectToDb();
  console.log("order service running");
});
