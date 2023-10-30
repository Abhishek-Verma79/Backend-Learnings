const jwt = require('jsonwebtoken');
const JWT_KEY = require('../../secrets');
  
  // let flag = false; // user is logged in or not
  function protectRoute(req,res,next){
    if(req.cookies.login){
      let isVerified = jwt.verify(req.cookies.login,JWT_KEY);

      if(isVerified) next(); // user is logged in
      else{
        res.json({
          message: "user not verified!"
        })
      }
    }else{
      return res.json({
        message: 'Operation not allowed!'
      })
    }
  }

  module.exports = protectRoute;