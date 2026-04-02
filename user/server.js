const express = require("express");
const connectToDb = require("./utils/connectToDb");
const { login ,register, getUserInfos} = require("./contorollers/user");

const app = express();

app.use(express.json());

app.post("/register", register);
app.post("/login",login);
app.get("/infos/:id",getUserInfos);


app.all("*all",function(req,res){
    res.json({message:"404 not found"}) 
})
app.use(function (error, req, res, next) {
  res.status(500).json({ message: error.message });
});

app.listen(3001, function () {
  connectToDb();
  console.log("user service running on port 3001");
});
 