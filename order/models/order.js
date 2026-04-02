const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId,required:true},
    order:[{productId:mongoose.Types.ObjectId,qty:{type:String,min:1},_id:false}]
})

const orderModel=mongoose.model('order',orderSchema)


module.exports=orderModel