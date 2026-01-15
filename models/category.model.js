const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        icon: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        collection: 'Category',
        timestamps: true
    });

const Category = model('Category', categorySchema);

module.exports = Category;