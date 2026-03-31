const mongoose=require('mongoose')


const productSchema=new mongoose.Schema({
    name:{type:String},
    price:Number,
    user:{type:mongoose.Types.ObjectId},
    stock:{type:Number,default:0}
})

const productModel=mongoose.model("product",productSchema)


module.exports=productModel