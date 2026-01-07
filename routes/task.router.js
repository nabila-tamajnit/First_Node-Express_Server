const taskController = require('../controllers/task.controller');

const taskRouter = require('express').Router();

taskRouter.route('/')
    .get(taskController.getAll)
    .post(taskController.insert)

taskRouter.route('/:id')
    .get(taskController.getAll)
    .put(taskController.update)
    .delete(taskController.delete)
    .patch(taskController.updateStatus)


taskRouter.get('/user/:id', taskController.getByUser)


module.exports = taskRouter;