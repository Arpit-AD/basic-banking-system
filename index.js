const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./router/userRouter");
const { userInfo } = require("os");
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

app.get('/transferPage', (req, res) => {
  res.render('transfer')
})

app.post("/transfermoney", async (req, res) => {

  const { transferfrom, transferto, amount } = req.body;


  if (transferfrom === transferto) {
    res.render("paymentfailure", { message: "Same account! Choose a Different account to transfer" });
  }

  let senderUser, transferUser;
  try {
    senderUser = await User.findOne({ accountNumber: transferfrom });
    transferUser = await User.findOne({ accountNumber: transferto });
  }
  catch (err) {
    res.render("paymentfailure", { message: "Something went wrong" });
  }

  if (!senderUser || !transferUser) {
    res.render("paymentfailure", { message: "Give the correct account details" });
  }

  if (senderUser.currentBalance < amount) {
    res.render("paymentfailure", { message: "Not Enough Balance" });
  }

  console.log(typeof(senderUser.currentBalance), typeof(transferUser.currentBalance), typeof(amount));

  senderUser.currentBalance = senderUser.currentBalance - Number(amount);
  transferUser.currentBalance = transferUser.currentBalance + Number(amount);

  let savedsenderUser, savedtransferUser;
  // console.log()
  try {
    savedsenderUser = await senderUser.save();
    savedtransferUser = await transferUser.save();
  }
  catch (err) {
    res.render("paymentfailure", { message: "Something went wrong" });
  }

  res.render("paymentsuccessful", { message: "Transaction successful" });

});

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/user", userRouter);

app.listen(process.env.PORT || 5000, () => console.log("Server listening at port 5000"));
