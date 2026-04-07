const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    console.log("first")
    const token = req.headers.Authorization || req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: "unauthorized" });
    }
    const decode = jwt.verify(token, "helloWorld");
    req.user = decode.id;
    req.headers.Authorization=decode.id
    console.log(req.headers.Authorization)
    next(); 
  } catch (error) {
    next(error)
  }
}

module.exports=auth