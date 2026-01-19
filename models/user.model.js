const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        firstname : {
            type : String,
            required : true,
            trim : true
        },
        lastname : {
            type : String,
            required : true,
            trim : true
        },
        email : {
            type : String,
            required : true,
            trim : true,
            unique : true
        },
        password : {
            type : String,
            required : true,
        },
        role : {
            type : String,
            required : true,
            enum : ["User", "Admin"],
            default : 'User'
        }
    },
    {
        collection : 'User',
        timestamps : true
    });

const User = model('User', userSchema);

module.exports = User;