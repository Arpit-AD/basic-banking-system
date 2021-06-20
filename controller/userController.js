const User = require("../model/user.js");
// const path = require('path')
// const express = require('express');
// express.use(express.static(path.join(__dirname, '/Public')));


exports.start = (req, res) => {
    console.log("Hello");
    res.json({
        message: "Hello world",
    })
};


exports.userSignup = (req, res) => {
    const { name, email, currentBalance, accountNumber } = req.body;

    if (!name || !email || !currentBalance || !accountNumber) {
        res.status(422).json({ message: "Fill all the details" })
    }

    const user = new User({
        ...req.body
    })

    user.save().then(savedUser => {
        res.status(200).json({ user: savedUser });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" })
    })

}



exports.getUserById = (req, res) => {

    User.findById(req.params.id)
        .then(gotUser => {
            res.status(200).json({ user: gotUser })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Something went wrong" })
        })

}

// exports.editUser = (req , res) => 
// {

//     User.findByIdAndUpdate(req.params.id,
//         {
//             name: req.body.name,
//             currentBalance: req.body.currentBalance
//         },
//         { new: true }
//         )
//         .then( editedUser => {
//             res.status(200).json({ user : editedUser });
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({ messsage: "Something went Wrong" })
//         }) 
// }

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(deletedUser => {
            res.status(200).json({ user: deletedUser });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Something went wrong" })
        })
}

exports.transferMoney = (req, res) => {



}