const categoryController = require('../controllers/category.controller');
const idValidatorMiddleware = require('../middlewares/idValidator.middleware');

const categoryRouter = require('express').Router();

categoryRouter.route('/')
    .get(categoryController.getAll)
    .post(categoryController.insert)

categoryRouter.route('/:id')
    .get(idValidatorMiddleware(), categoryController.getById)
    .put(idValidatorMiddleware(), categoryController.update)
    .delete(idValidatorMiddleware(), categoryController.delete)

module.exports = categoryRouter;