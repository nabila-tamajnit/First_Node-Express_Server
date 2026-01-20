const taskController = require('../controllers/task.controller');
const bodyValidatorMiddleware = require('../middlewares/bodyValidator.middleware');
const authenticationMiddleware = require('../middlewares/auth/authentication.middleware');

const taskRouter = require('express').Router();

taskRouter.route('/')
    .get(taskController.getAll)
    .post(authenticationMiddleware(), bodyValidatorMiddleware(), taskController.insert)

taskRouter.route('/:id')
    .get(taskController.getById)
    .put(bodyValidatorMiddleware(), taskController.update)
    .delete(taskController.delete)
    .patch(bodyValidatorMiddleware(), taskController.updateStatus)


taskRouter.get('/user/:id', taskController.getByUser)


module.exports = taskRouter;