const { Schema, model, Types } = require("mongoose");

const taskSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        isDone: {
            type: Boolean,
            required: true,
            default: false
        },
        before: {
            type: String
        },
        categoryId: {
            type: Types.ObjectId,
            ref: Category,
            required: true
        },
        fromUserId: {
            type: Types.ObjectId,
            ref: User,
            required: true
        },
        toUserId: {
            type: Types.ObjectId,
            ref: User,
            required: true
        }

    },
    {
        collection: 'Task',
        timestamps: true
    });

const Task = model('Task', taskSchema);

module.exports = Task;