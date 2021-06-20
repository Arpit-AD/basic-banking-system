const mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
    accountNumber: {
        type : String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    currentBalance: {
        type: Number,
        required: true,
    },
})


module.exports= User = mongoose.model("user", userSchema);