const categoryController = require('../controllers/category.controller');
const bodyValidatorMiddleware = require('../middlewares/bodyValidator.middleware');

const categoryRouter = require('express').Router();

categoryRouter.route('/')
    .get(categoryController.getAll)
    .post(bodyValidatorMiddleware(), categoryController.insert)

categoryRouter.route('/:id')
    .get(categoryController.getById)
    .put(bodyValidatorMiddleware(), categoryController.update)
    .delete(categoryController.delete)

module.exports = categoryRouter;