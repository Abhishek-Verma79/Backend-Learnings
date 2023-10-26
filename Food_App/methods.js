const express = require("express");

const app = express();
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
const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter');

//base route, router to use
app.use("/user", userRouter);
app.use("/auth", authRouter);



app.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>");
});







