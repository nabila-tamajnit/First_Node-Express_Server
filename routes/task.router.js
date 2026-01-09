const taskController = require('../controllers/task.controller');
const idValidatorMiddleware = require('../middlewares/idValidator.middleware');
const nameVerificationMiddleware = require('../middlewares/nameVerification.middleware');

const taskRouter = require('express').Router();

taskRouter.route('/')
    .get(taskController.getAll)
    .post(nameVerificationMiddleware(), taskController.insert)

taskRouter.route('/:id')
    .get(idValidatorMiddleware(), taskController.getById)
    .put(idValidatorMiddleware(), nameVerificationMiddleware(), taskController.update)
    .delete(idValidatorMiddleware(), taskController.delete)
    .patch(idValidatorMiddleware(), taskController.updateStatus)


taskRouter.get('/user/:name', taskController.getByUser)


module.exports = taskRouter;