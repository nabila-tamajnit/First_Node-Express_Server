const { categories } = require("./fakeDb")

const fakeCategoryService = {

    find: () => {
        return categories;
    },

    findById: (id) => {
       const searchedCategory = categories.find(category => category.id === id); 

        // la méthode find fait ça ↓
        // let searchedCategory;
        // for(let category of categories){
        //     if(category.id === id) {
        //         searchedCategory = category;
        //     }
        // }

        return searchedCategory;
        //ou directement return categories.find(category => category.id === id)

    },

    create: (category) => {

        // const idMax = Math.max(...categories.map(category => category.id));
        // const newId = idMax + 1;
        //category.id = newId
        // ou

        category.id = Math.max(...categories.map(category => category.id)) + 1;

        categories.push(category);

        return category;
    },

    nameAlreadyExists : (name) => {
        //some() renvoie un booléen pour savoir si la condition renseignée est remplie au moins une fois
        // ici, si une catégorie avec le nom reçu en paramètre existe, existing sera true sinon false
        const existing = categories.some(category => category.name === name);

        return existing;
        // return categories.some(category => category.name === name);
    }
}


// CRUD -> 
// C -> Create
// R -> Read
// U -> Update
// D -> Delete

module.exports = fakeCategoryService;