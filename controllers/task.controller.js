const { Request, Response } = require('express')

const fakeTaskService = require("../services/fake/fakeTask.service");

const taskController = {

    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    getAll : (req, res) => {
        const tasks = fakeTaskService.find();

        // Version 1 (quand ya pas forcement bcp d'éléments)
        // res.status(200).json(tasks)

        // Version 2 (mieux quand y aura beaucoup d'éléments)
        const dataToSend = {
            count : tasks.length,
            tasks : tasks
        };

        res.status(200).json(dataToSend);
    },
    //? -------------------------------------------
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    getById : (req, res) => {
        const id = +req.params.id;
        const task = fakeTaskService.findById(id);

        if(!task){
            res.status(404).json({
                statusCode : 404,
                message : 'Tâche non trouvée'
            })
        }

        res.status(200).json(task);
    },
    //? -------------------------------------------
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    getByUser : (req, res) => {
        const userName = req.params.name;

        //  Version 1 
        // const tasks = fakeTaskService.findToUser(userName);
        // res.status(200).json(tasks);

        //  Version 2
        const tasksToDo = fakeTaskService.findAssignedTo(userName);
        const tasksGiven = fakeTaskService.findGivenBy(userName);

        const dataToSend = {
            tasksToDo,
            tasksGiven
        }

        res.status(200).json(dataToSend);

    },
    //? -------------------------------------------
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    insert : (req, res) => {
        const taskToAdd = req.body;
        const addedTask = fakeTaskService.create(taskToAdd);

        res.location(`/api/tasks/${addedTask.id}`);
        res.status(201).json(addedTask);
    },
    //? -------------------------------------------
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    update : (req, res) => {
        const id = +req.params.id;
        const newTaskInfos = req.body;

        const task = fakeTaskService.findById(id);
        if(!task) {
            res.status(404).json({
                statusCode : 404,
                message : 'La tâche que vous essayez de modifier n\'existe pas'
            });
        }

        const updatedTask = fakeTaskService.update(id, newTaskInfos);

        res.status(200).json(updatedTask);
    },
    //? -------------------------------------------
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    updateStatus : (req, res) => {
        const id = +req.params.id;
        const newStatus = req.body.isDone;

        const task = fakeTaskService.findById(id);
        if (!task) {
            res.status(404).json({
                statusCode : 404,
                message : 'La tâche que vous essayez de modifier n\'existe pas'
            });
        }

        const updatedTask = fakeTaskService.updateStatus(id, newStatus);

        res.status(200).json(updatedTask);
    },
    //? -------------------------------------------
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    delete : (req, res) => {
        const id = +req.params.id;

        if(fakeTaskService.delete(id)){
            res.sendStatus(204);
        }
        else {
            res.status(404).json({
            statusCode : 404,
            message : 'Suppression impossible, la tâche n\'existe pas'
        })
        }

        
    }

}

module.exports = taskController;