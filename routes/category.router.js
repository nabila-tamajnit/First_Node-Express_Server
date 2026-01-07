const categoryController = require('../controllers/category.controller');

const categoryRouter = require('express').Router();

categoryRouter.route('/')
    .get(categoryController.getAll)
    .post(categoryController.insert)

categoryRouter.route('/:id')
    .get(categoryController.getById)
    .put(categoryController.update)
    .delete(categoryController.delete)

module.exports = categoryRouter;