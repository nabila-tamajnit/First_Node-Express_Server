const taskController = require('../controllers/task.controller');
const bodyValidatorMiddleware = require('../middlewares/bodyValidator.middleware');
const idValidatorMiddleware = require('../middlewares/idValidator.middleware');

const taskRouter = require('express').Router();

taskRouter.route('/')
    .get(taskController.getAll)
    .post(bodyValidatorMiddleware(), taskController.insert)

taskRouter.route('/:id')
    .get(idValidatorMiddleware(), taskController.getById)
    .put(bodyValidatorMiddleware(), idValidatorMiddleware(), taskController.update)
    .delete(idValidatorMiddleware(), taskController.delete)
    .patch(bodyValidatorMiddleware(), idValidatorMiddleware(), taskController.updateStatus)


taskRouter.get('/user/:name', taskController.getByUser)


module.exports = taskRouter;