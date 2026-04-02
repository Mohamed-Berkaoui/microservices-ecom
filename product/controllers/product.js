const productModel = require("../model/product");

/**
 * @todo add user id
 */
async function createProduct(req, res, next) {
  try {
    const newProduct = await productModel.insertOne(req.body);
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
}

async function getAllProducts(req, res, next) {
  try {
    const prods = await productModel.find();
    res.json(prods);
  } catch (error) {
    next(error);
  }
}
async function getProductDetails(req, res, next) {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId);
    res.json({data:product});
  } catch (error) {
    next(error);
  }
}
// /decrease/:id
async function checkAndDecrease(req, res, next) {
  try {
    const order = req.body.order;
console.log(order)

    const products = [];
    for (let i = 0; i < order.length; i++) {
      products[i] = await productModel.findOne({_id:order[i].productId});
      console.log(products[i])
      if (!products[i] || products[i].stock < order[i].qty) {
        res.status(400).json({ message: "out of stock" });
        return;
      }
    }
    console.log(products)
    for (let i = 0; i < products.length; i++) {
      products[i].stock = products[i].stock - order[i].qty;
      await products[i].save();
      console.log("first")
    }
    res.status(200).json({message:"Success"});
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createProduct,
  getProductDetails,
  getAllProducts,
  checkAndDecrease,
};
