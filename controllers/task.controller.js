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
        const tasks = fakeTaskService.findToUser(userName);

        res.status(200).json(tasks)
        // res.sendStatus(501);
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
        res.sendStatus(501);
    },
    //? -------------------------------------------
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    updateStatus : (req, res) => {
        res.sendStatus(501);
    },
    //? -------------------------------------------
    /**
     * Récupérer toutes les tâches
     * @param { Request } req 
     * @param { Response } res 
     */
    delete : (req, res) => {
        res.sendStatus(501);
    }

}

module.exports = taskController;