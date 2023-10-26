  // let flag = false; // user is logged in or not
  function protectRoute(req,res,next){
    if(req.cookies.isLoggedIn){
      next(); // user is logged in
    }else{
      return res.json({
        message: 'Operation not allowed!'
      })
    }
  }

  module.exports = protectRoute;