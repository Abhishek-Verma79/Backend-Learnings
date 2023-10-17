const express = require("express");

const app = express();
const userModel = require('./models/userModel');
const cookieParser = require("cookie-parser");

//middleware function
app.use(express.json());
app.use(cookieParser());

app.listen(3000);

// some operations using this users array as an object so when using them make it an object not an array
let users = [
  {
    id: 1,
    name: "Abhishek",
  },
  {
    id: 2,
    name: "Jasbir",
  },
  {
    id: 3,
    name: "Kartik",
  },
];

//mini app
const userRouter = express.Router();
const authRouter = express.Router();

//base route, router to use
app.use("/user", userRouter);
app.use("/auth", authRouter);

userRouter
  .route("/")
  .get(getUsers)
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

authRouter.route("/signup").get(middleware, getSignUp).post(postSignUp);




function middleware(req, res, next) {
  console.log("middleware encountered!");
  next();
}

// app.get('/user',);

// app.post('/user',)

// update data
// app.patch('/user',);

// Delete data
// app.delete('/user',);

//params
// app.get("/user/:username", (req, res) => {
//   console.log(req.params);
//   console.log(req.params.username);
//   res.send("user id received!");
// });

app.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>");
});

async function getUsers(req, res) {
  // console.log(req.query);
  // res.send(users);
  // let allUsers = await userModel.find();
  let allUsers = await userModel.findOne({ name: "Abhishek" });
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
}


function setCookies(req,res){
  // res.setHeader('Set-Cookie','isLoggedIn=true');
  
  // using cookie parser package
  res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24, secure: true, httpOnly: true});
  res.send('cookies has been set');
}

function getCookies(req,res){
  let cookies = req.cookies;
  console.log(cookies);
  res.send("cookies received");
}

