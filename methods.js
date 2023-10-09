const express = require("express");

const app = express();

//middleware function
app.use(express.json());

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

//base route, router to use
app.use("/user", userRouter);

userRouter
  .route("/")
  .get(getUser)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/:id").get(getUserById);

// app.get('/user',);

// app.post('/user',)

// update data
// app.patch('/user',);

// Delete data
// app.delete('/user',);

//params
app.get("/user/:username", (req, res) => {
  console.log(req.params);
  console.log(req.params.username);
  res.send("user id received!");
});

function getUser(req, res) {
  console.log(req.query);
  res.send(users);
}

function postUser(req, res) {
  console.log(req.body);
  users = req.body;
  res.json({
    message: "Data received successfully",
    user: req.body,
  });
}

function updateUser(req, res) {
  console.log("req body -> ", req.body);
  let dataToBeUpdated = req.body;
  for (let key in dataToBeUpdated) {
    users[key] = dataToBeUpdated[key];
  }
  res.send({
    message: "data updated successfully",
  });
}

function deleteUser(req, res) {
  users = [];
  res.json({
    message: "data has been deleted!",
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
