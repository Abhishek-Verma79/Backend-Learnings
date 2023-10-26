const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/userModel');
const protectRoute = require('./authHelper');

userRouter
  .route("/")
  .get(protectRoute,getUsers)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter
  .route('/getCookies')
  .get(getCookies);

userRouter
  .route('/setCookies')
  .get(setCookies);


userRouter.route("/:id").get(getUserById);

async function getUsers(req, res) {
    // console.log(req.query);
    // res.send(users);
    let allUsers = await userModel.find();
    // let allUsers = await userModel.findOne({ name: "Abhishek" });
    res.json({
      message: "list of all users",
      data: allUsers,
    });
  }
  
  function postUser(req, res) {
    console.log(req.body);
    users = req.body;
    res.json({
      message: "Data received successfully",
      user: req.body,
    });
  }
  
  async function updateUser(req, res) {
    console.log("req body -> ", req.body);
    let dataToBeUpdated = req.body;
    let user = await userModel.findOneAndUpdate(
      { email: "abc@gmail.com" },
      dataToBeUpdated
    );
    // for (let key in dataToBeUpdated) {
    //   users[key] = dataToBeUpdated[key];
    // }
    res.send({
      message: "data updated successfully",
    });
  }
  
  async function deleteUser(req, res) {
    // users = [];
    const dataToBeDeleted = req.body;
    let user = await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
      message: "data has been deleted!",
      data: user,
    });
  }
  
  function getUserById(req, res) {
    console.log(req.params.id);
    let paramId = req.params.id;
    let obj = {};
    for (let i = 0; i < users.length; i++) {
      if (users[i]["id"] == paramId) {
        obj = users[i];
      }
    }
    res.json({
      message: "Req received",
      data: obj,
    });
  }


  function setCookies(req,res){
    // res.setHeader('Set-Cookie','isLoggedIn=true');
    
    // using cookie parser package
    res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24, secure: true, httpOnly: true});
    res.send('cookies has been set');
  }
  
  
  function getCookies(req,res){
    let cookies = req.cookies;
    // console.log(cookies);
    res.send("cookies received");
  }



  module.exports = userRouter;
  