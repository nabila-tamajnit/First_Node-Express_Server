const Category = require("../../models/category.model");
const Task = require('../../models/task.model');

const categoryService = {
    /* On va créer notre "vrai" service cette fois ci mais ce sont les mêmes fonctionnalités que notre fakeService, donc nous aurons les mêmes fonctions */

    find: async () => {
        try {
            // On va interroger la db (ça peut prendre du temps ou planter donc c'est une promesse)
            const categories = await Category.find();
            return categories;
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    findById: async (id) => {
        try {
            const searchedCategory = await Category.findById(id);
            return searchedCategory;

        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    create: async (category) => {
        try {

            // Dans category il y a des informations contenues dans le body
            // On va créer l'objet à ajouter à partir du model qu'on a créé
            const categoryToAdd = Category(category);
            // On va "sauvegarder" (c'est à dire insérer) notre category dans la db
            await categoryToAdd.save();
            // Si tout s'est bien passé, on renvoie la category créée
            return categoryToAdd;

        } catch (err) {

            console.log(err);
            throw new Error(err);
        }


    },

    delete : async (id) => {
        try {
            const deletedCategory = await Category.findByIdAndDelete(id);
            if(!deletedCategory) return false;
            else return true;
        }
        catch(err) {
            throw new Error(err);
        }
    },

    nameAlreadyExists: async (name) => {
        try {

            //Trouver dans la db une categorie qui possède le nom reçu en paramètre
            // const searchedCategory = await Category.findOne( { name : name } );
            const searchedCategory = await Category.findOne({ name });

            if (searchedCategory) {
                // Si une catégorie a été trouvée c'est que le nom existait déjà donc on renvoie VRAI 
                return true;
            }
            else {
                // Si aucune catégorie n'a été trouvée c'est que le nom n'existait pas donc on renvoie FAUX 
                return false;
            }

        } catch (err) {

            console.log(err);
            throw new Error(err);

        }
    },

    isUsed : async(id) => {
        try {

            // On essaie de récupérer un moins une tâche qui a cet id comme categoryId
            const task = await Task.findOne( { categoryId : id } )
            //Si pas de tâche, aucune n'est liée à cette catégorie donc on renvoie faux, elle n'es pas utilisée
            if(!task) return false;
            //Si y'a une tâche, au moins une est reliée donc on renvoie vrai
            else return true; 

        }catch(err){
            throw new Error(err)
        }
    }
}

module.exports = categoryService;