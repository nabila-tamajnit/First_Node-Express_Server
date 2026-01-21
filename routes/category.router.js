const categoryController = require("../controllers/category.controller");
const bodyValidatorMiddleware = require("../middlewares/bodyValidator.middleware");

// Import du middleware pour indiquer que le token est obligatoire
const authenticationMiddleware = require('../middlewares/auth/authentication.middleware');
// Import du middleware pour bloquer une route à des rôles en particulier
const roleAuthorizationMiddleware = require('../middlewares/auth/roleAuthorization.middleware');

const categoryRouter = require("express").Router(); //création routeur

categoryRouter.route('/')
    .get(categoryController.getAll)
    .post( authenticationMiddleware(), 
            roleAuthorizationMiddleware(['Admin']),
            bodyValidatorMiddleware(), 
            categoryController.insert)

//categoryRouter.get('/', categoryController.getAll)
//categoryRouter.post('/', bodyValidatorMiddleware() , categoryController.insert)

categoryRouter.route('/:id')
    .get(categoryController.getById)

    .put(authenticationMiddleware(),
         roleAuthorizationMiddleware(['Admin']),
         bodyValidatorMiddleware(),
         categoryController.update)

    .delete(authenticationMiddleware(), 
            roleAuthorizationMiddleware(['Admin']),
            categoryController.delete)


//categoryRouter.get('/:id', categoryController.getById)
//categoryRouter.put('/:id', bodyValidatorMiddleware(),  categoryController.update)
//categoryRouter.delete('/:id', categoryController.delete)

module.exports = categoryRouter; //permet de rendre exportable categoryRouter

