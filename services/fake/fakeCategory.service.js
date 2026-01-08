const { categories } = require("./fakeDb");

const fakeCategoryService = {

    find : () => {
        return categories;
    },

    findById : (id) => {
        return categories.find(category => category.id === id);
    },

    create : (categoryToAdd) => {
        const idMax = Math.max(...categories.map(category => category.id));

        categoryToAdd.id = idMax + 1;

        categories.push(categoryToAdd);

        return categoryToAdd;
    },

    alReadyExists : (name) => {
        return categories.some(category => category.name === name);
    }
}

module.exports = fakeCategoryService;