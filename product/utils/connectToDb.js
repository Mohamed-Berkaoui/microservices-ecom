const mongoose=require('mongoose')



function connectToDb(){
    mongoose.connect('mongodb://localhost:27017/',{dbName:"product-service"})
    .then(()=>console.log('connected to db'))
    .catch(e=>console.log(e.message))
}

module.exports=connectToDb