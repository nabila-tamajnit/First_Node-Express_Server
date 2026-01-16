const { Request, Response } = require('express')

const fakeTaskService = require("../services/fake/fakeTask.service");
const taskService = require('../services/mongo/task.service');

const taskController = {

    //? ======================GETALL===============================
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    getAll: async (req, res) => {

        try {
            const tasks = await taskService.find();

            res.status(200).json(tasks);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ statusCode: 500, message: 'erreur avec la DB' });
        }
        // Version 1 (quand ya pas forcement bcp d'éléments)
        // res.status(200).json(tasks)

        // Version 2 (mieux quand y aura beaucoup d'éléments)
        // const dataToSend = {
        //     count: tasks.length,
        //     tasks: tasks
        // };

        // res.status(200).json(dataToSend);
    },
    //? ======================GETBYID===============================
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    getById: async (req, res) => {
        const id = req.params.id;

        try {
            const task = await taskService.findById(id);

            if (!task) {
                res.status(404).json({
                    statusCode: 404,
                    message: 'Tâche non trouvée'
                })
            }

            res.status(200).json(task);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur de la DB' })
        }


    },
    //? ======================GETBYUSER===============================
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    getByUser: async (req, res) => {

        try {
            const userId = req.params.id;

            const tasksToDo = await taskService.findAssignedTo(userId);
            const tasksGiven = await taskService.findGivenBy(userId);

            const dataToSend = {
                tasksToDo,
                tasksGiven
            }

            res.status(200).json(dataToSend);
        }
        catch(err) {
            console.log(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur de la DB' })
        }
        //  Version 1 
        // const tasks = fakeTaskService.findToUser(userName);
        // res.status(200).json(tasks);

        //  Version 2
    },
    //? ======================INSERT===============================
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    insert: async (req, res) => {
        const taskToAdd = req.body

        try {
            insertedTask = await taskService.create(taskToAdd);

            res.location(`/api/tasks/${insertedTask}`);
            res.status(201).json(insertedTask);
        }
        catch (err) {
            res.sendStatus(500);
        }
    },
    //? ======================UPDATE===============================
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    update: (req, res) => {
        const id = +req.params.id;
        const newTaskInfos = req.body;

        const task = fakeTaskService.findById(id);
        if (!task) {
            res.status(404).json({
                statusCode: 404,
                message: 'La tâche que vous essayez de modifier n\'existe pas'
            });
        }

        const updatedTask = fakeTaskService.update(id, newTaskInfos);

        res.status(200).json(updatedTask);
    },
    //? ====================UPDATESTATUS===============================
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    updateStatus: (req, res) => {
        const id = +req.params.id;
        const newStatus = req.body.isDone;

        const task = fakeTaskService.findById(id);
        if (!task) {
            res.status(404).json({
                statusCode: 404,
                message: 'La tâche que vous essayez de modifier n\'existe pas'
            });
        }

        const updatedTask = fakeTaskService.updateStatus(id, newStatus);

        res.status(200).json(updatedTask);
    },
    //? ======================DELETE===============================
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    delete: async (req, res) => {
        const id = req.params.id;

        try {
            
            if (taskService.delete(id)) {
            res.sendStatus(204);
        }
        else {
            res.status(404).json({
                statusCode: 404,
                message: 'Suppression impossible, la tâche n\'existe pas'
            })
        }
        }
        catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }

}

module.exports = taskController;