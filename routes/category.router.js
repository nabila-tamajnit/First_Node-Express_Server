const categoryController = require('../controllers/category.controller');
const bodyValidatorMiddleware = require('../middlewares/bodyValidator.middleware');

const authenticationMiddleware = require('../middlewares/auth/authentication.middleware');
const roleAuthorizationMiddleware = require('../middlewares/auth/roleAuthorization.middleware');

const categoryRouter = require('express').Router();

categoryRouter.route('/')
    .get(categoryController.getAll)

    .post(authenticationMiddleware(), 
    roleAuthorizationMiddleware(['Admin']), 
    bodyValidatorMiddleware(), 
    categoryController.insert)

categoryRouter.route('/:id')
    .get(categoryController.getById)

    .put(authenticationMiddleware(), 
    roleAuthorizationMiddleware(['Admin']), 
    bodyValidatorMiddleware(), 
    categoryController.update)

    .delete(authenticationMiddleware(), 
    roleAuthorizationMiddleware(['Admin']), 
    categoryController.delete)

module.exports = categoryRouter;