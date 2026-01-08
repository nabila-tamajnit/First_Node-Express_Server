const { Request, Response } = require('express')

const fakeCategoryService = require("../services/fake/fakeCategory.service");

const categoryController = {

    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    getAll : (req, res) => {
        const categories = fakeCategoryService.find();

        res.status(200).json(categories);
    },
    //? -------------------------------------------
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    getById : (req, res) => {
        const id = +req.params.id;
        const category = fakeCategoryService.findById(id);

        if(!category){
            res.status(404).json( {
                statusCode : 404,
                message : 'Catégorie non trouvée'
            })
        }
        
        res.status(200).json(category);
    },
    //? -------------------------------------------
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    insert : (req, res) => {
        const categoryToAdd = req.body;   

        if(fakeCategoryService.alReadyExists(categoryToAdd.name)) {
            res.status(409).json( {
                statusCode : 409,
                message : `La catégorie ${categoryToAdd.name} éxiste déjà`
            })
        }

        const addedCategory = fakeCategoryService.create(categoryToAdd);  

        res.location(`/api/categories/${addedCategory}`);
        res.status(201).json(addedCategory);
        // res.sendStatus(501);
    },
    //? -------------------------------------------
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    update : (req, res) => {
        res.sendStatus(501);
    },
    //? -------------------------------------------
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    delete : (req, res) => {
        res.sendStatus(501);
    },
}

module.exports = categoryController;