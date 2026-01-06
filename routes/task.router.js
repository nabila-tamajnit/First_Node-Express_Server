const taskRouter = require('express').Router();

taskRouter.get('/', (req, res) => {
    res.send('Voici toutes les tâches', 200);
})

taskRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Voici la tâche numero ${id}`);
})

taskRouter.post('/', (req, res) => {
    const taskToInsert = req.body;
    res.send(taskToInsert, 201);
})

taskRouter.put('/:id', (req, res) => {
    const taskId = req.params.id;
    const taskUpdate = req.body;
    taskUpdate.id = taskId;

    res.send( taskUpdate , 200);
})

taskRouter.delete('/:id', (req, res) => {
    res.sendStatus(204);
})


taskRouter.get('/user/:id', (req, res) => {
    const user = req.params.id;
    res.send(`Voici les taches de l'utilisateur ${user}`);
})

taskRouter.patch('/:isDone', (req, res) => {
    const taskIsDone = req.params.isDone;
    const taskIsDoneUpdate = req.body;

    res.send( taskIsDoneUpdate , 200);
})

module.exports = taskRouter;