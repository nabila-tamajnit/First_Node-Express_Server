const { Schema, model } = require('mongoose');

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
            enum : ['User', 'Admin'], 
            /* enum permet de donner une liste de chaines autorisées, si on encode autre chose -> erreur */
            default : 'User' 
            /* default permet de mettre une valeur par défaut, si on ne renseigne pas de role, ce sera User qui sera inséré */
        }
    }, 
    {
        collection : 'User',
        timestamps : true
    });

const User = model('User', userSchema);

module.exports = User;