const productModel = require("../model/product");

/**
 * @todo add user id
 */
async function createProduct(req,  res ,next) {
  try {
    const newProduct = await productModel.insertOne(req.body);
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
}

async function getAllProducts(req,  res ,next) {
  try {
    const prods = await productModel.find();
    res.json(prods);
  } catch (error) {
    next(error);
  }
}
async function getProductDetails(req,  res ,next) {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId);
    res.json(product);
  } catch (error) {
    next(error);
  }
}
// /decrease/:id
async function checkAndDecrease(req,res,next){
    try {
        const qty=req.body.qty
        const product=await productModel.findById(req.params.id)
        if(!product || product.stock<qty){
            res.status(400).json({message:"out of stock"})
            return
        }
        product.stock=product.stock-qty
        await product.save()
        res.json(product)
    } catch (error) {
        next(error)
    }
}

module.exports={createProduct,getProductDetails,getAllProducts,checkAndDecrease}