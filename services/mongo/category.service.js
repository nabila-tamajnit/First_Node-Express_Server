const Category = require("../../models/category.model");

const categoryService = {

    //? ======================FIND===============================
    find : async() => {
        try {
            const categories = await Category.find();
            return categories;
        } 
        catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },
    //? ======================FINDBYID===============================
    findById : async(id) => {
        try {
            const searchedCategory = await Category.findById(id);
            return searchedCategory;

        } catch(err) {
            console.log(err);
            throw new Error(err);
            
        }
    },
    //? ======================CREATE===============================
    create : async(category) => {},

    //? ====================NAMEALREADYEXISTS=============================
    nameAlreadyExists : async(name) => {
        try {

            const searchedCategory = await Category.findOne( { name } );
            
            if(searchedCategory) {

                return true;
            }
            else {
                return false;
            }
        }
        catch(err) {
            console.log(err);
            throw new Error(err)
            
        }
    }
}

module.exports = categoryService;