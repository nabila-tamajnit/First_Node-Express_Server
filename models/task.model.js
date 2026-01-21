const { Schema, model, Types } = require('mongoose');
const Category = require('./category.model');
const User = require('./user.model');

const taskSchema = new Schema(
    {
        name : {
            type : String,
            required : true,
            trim : true
        },
        isDone : {
            type : Boolean,
            required : true,
            default : false
        },
        before : {
            type : String
            /* ne pas mettre required = required false */
        },
        categoryId : {
            type : Types.ObjectId, 
            /* Pour préciser que c'est un type ObjectId on doit importer Types, qui est un objet qui contient tous les types bizaroïdes */
            ref : Category,
            /* Pour créer une référence vers le model Category  */
            required : true
        },
        fromUserId : {
            type : Types.ObjectId,
            ref : User,
            required : true
        },
        toUserId : {
            type : Types.ObjectId,
            ref : User,
            required : true,
        }
    },
    {
        collection : 'Task',
        timestamps : true
    });

const Task = model('Task', taskSchema);

module.exports = Task;