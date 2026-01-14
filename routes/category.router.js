const categoryController = require('../controllers/category.controller');
const bodyValidatorMiddleware = require('../middlewares/bodyValidator.middleware');
const idValidatorMiddleware = require('../middlewares/idValidator.middleware');

const categoryRouter = require('express').Router();

categoryRouter.route('/')
    .get(bodyValidatorMiddleware(), categoryController.getAll)
    .post(categoryController.insert)

categoryRouter.route('/:id')
    .get(idValidatorMiddleware(), categoryController.getById)
    .put(bodyValidatorMiddleware(), idValidatorMiddleware(), categoryController.update)
    .delete(idValidatorMiddleware(), categoryController.delete)

module.exports = categoryRouter;