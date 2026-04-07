const express=require('express')
var proxy = require('express-http-proxy');
const auth = require('./middlewares/auth');
const userServiceUrl="http://127.0.0.1:3001"
const productServiceUrl="http://127.0.0.1:3002"
const orderServiceUrl="http://127.0.0.1:3003"

const app=express()
app.use(express.json())
app.use("/api/users",proxy(userServiceUrl))
app.use("/api/products",auth,proxy(productServiceUrl))
app.use("/api/orders",auth,proxy(orderServiceUrl))



app.all("*all",function(req,res,next){
    res.status(404).json({message:"not found"})
})

app.use(function(err,req,res,next){
    res.status(500).json({message:err.message})
})
app.listen(80,function(){
    console.log("getway is running on default")
})