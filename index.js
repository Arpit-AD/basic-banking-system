const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./router/userRouter")
require("dotenv").config();


const app = express();
// const mongoURI = "mongodb://localhost:27017/bankingsystem";
const mongoURI = process.env.MONGOURI;

app.set('view engine', 'ejs');

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, '/Public')));

// app.get("/" , (req, res) => {  
//     res.json({message : "Hello"})
// });

app.get("/", (req, res) => {
  res.render("home")
})

app.get('/users', (req, res) => {
  User.find()
    .then(gotUser => {
      res.status(200).render("users", { users: gotUser })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Something went wrong" })
    })
})

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/user", userRouter);

app.listen(5000, () => console.log("Server listening at port 5000"));
