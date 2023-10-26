const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/userModel');


authRouter.route("/signup").get(middleware, getSignUp).post(postSignUp);

authRouter
    .route('/login')
    .post(loginUser)


function middleware(req, res, next) {
    console.log("middleware encountered!");
    next();
  }

function getSignUp(req, res) {
    res.sendFile("./public/index.html", { root: __dirname });
  }
  
async function postSignUp(req, res) {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    res.json({
      message: "user signed up",
      data: user,
    });
};

async function loginUser(req,res){
    try{
    const data = req.body;
    if(data.email)
    {let user = await userModel.findOne({email:data.email});
    if(user){
        //bcrypt compare
        if(user.password === data.password){
            res.cookie('isLoggedIn',true,{httpOnly:true});
            return res.json({
                message: "User has logged in",
                userDetails: data
            });
        }else{
            return res.json({
                message: "Wrong credentials"
            });
        }
    }else{
        return res.json({
            message: "user not found"
        });
    }
    }else{
        return res.json({
            message: "Empty field found"
        });
    }
    }
    catch(err){
        return res.status(500).json({
            message: err.message
        });
    }
}

  module.exports = authRouter;