const express = require("express");
const connectToDb = require("./utils/connectToDb");
const { createProduct, getAllProducts, getProductDetails, checkAndDecrease } = require("./controllers/product");
const cors=require('cors')
const app = express();
app.use(cors())

app.use(express.json());
app.post('/create-product',createProduct)
app.get('/all',getAllProducts)
app.get('/product/:id',getProductDetails)
app.post('/check-decrease',checkAndDecrease)


app.all("*all",function(req,res){
    res.status(404).json({message:"404 not found"}) 
})
app.use(function (error, req, res, next) {
  res.json({ message: error.message });
});

app.listen(3002, function () {
  connectToDb();
  console.log("product service running on port 3000");
});
