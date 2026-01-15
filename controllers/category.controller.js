const { Request, Response } = require('express')

const fakeCategoryService = require("../services/fake/fakeCategory.service");

const categoryService = require('../services/mongo/category.service');


const categoryController = {

    //? ======================GETALL===============================
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    getAll: async (req, res) => {
        try {
            const categories = await categoryService.find();

            res.status(200).json(categories);
        } catch (err) {
            console.log(err);
            res.status(500).json({ statusCode: 500, message: 'erreur avec la DB' });

        }
    },
    //? ======================GETBYID===============================
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    getById: async (req, res) => {
        const id = req.params.id;

        try {
            const category = await categoryService.findById(id);

            if (!category) {
                res.status(404).json({
                    statusCode: 404,
                    message: `La catégorie ${id} n\'exixte pas`
                })
            }

            res.status(200).json(category);
        }
        catch (err) {
            res.status(500).json({ statusCode: 500, message: 'Erreur de la DB' })
        }
    },
    //? ======================INSERT===============================
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    insert: async (req, res) => {
        const categoryToAdd = req.body;

        try {
            const exists = await categoryService.nameAlreadyExists(categoryToAdd.name);

            if (exists) {
                res.status(409).json({
                    statusCode: 409,
                    message: `La catégorie ${categoryToAdd.name} éxiste déjà`
                })
            }
        }
        catch (err) {
            res.sendStatus(500);

        }


        const addedCategory = fakeCategoryService.create(categoryToAdd);

        res.location(`/api/categories/${addedCategory}`);
        res.status(201).json(addedCategory);
        // res.sendStatus(501);
    },
    //? ======================UPDATE===============================
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    update: (req, res) => {
        res.sendStatus(501);
    },
    //? ======================DELETE===============================
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    delete: (req, res) => {
        res.sendStatus(501);
    },
}

module.exports = categoryController;