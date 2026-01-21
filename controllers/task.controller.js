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
        const query = req.query;
        console.log(query);
        

        try {

            const tasks = await taskService.find(query);
            const dataToSend = {
                count: tasks.length,
                tasks
            };
            res.status(200).json(dataToSend);

        } catch (err) {

            res.status(500).json({ statusCode: 500, message: 'Erreur lors de la récupération des tâches dans la DB' });
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

            const id = req.params.id;
            const task = await taskService.findById(id);

            // Si pas de tâche récupérée (donc si l'id n'existe pas) l'API renvoie une erreur 404
            if (!task) {
                res.status(404).json({
                    statusCode: 404,
                    message: 'Tâche non trouvée'
                })
            }

            // Si y'a une tâche
            res.status(200).json(task);


        }
        catch (err) {
            res.status(500).json({ statusCode: 500, message: 'Une erreur est survenue lors de la récupération de la tâche' })
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
            //TODO Idéalement il faudrait utiliser un userService pour vérifier si l'utilisateur existe vraiment en DB

            const tasksToDo = await taskService.findAssignedTo(userId);
            const tasksGiven = await taskService.findGivenBy(userId);

            const dataToSend = {
                tasksToDo,
                tasksGiven
            }

            res.status(200).json(dataToSend);
        }
        catch (err) {
            res.status(500).json({ statusCode: 500, message: 'Erreur de la db' });
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
        const taskToAdd = req.body;

        try {
            const addedTask = await taskService.create(taskToAdd);
            // Pour respecter les principes REST, on doit rajouter à la réponse, une url qui permet de consulter la valeur ajoutée
            res.location(`/api/tasks/${addedTask.id}`);
            res.status(201).json(addedTask);

        }
        catch (err) {
            res.status(500).json({ statusCode: 500, message: 'Erreur lors de l\'ajout dans la DB' })
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
        try {

            const id = req.params.id;

            if (await taskService.delete(id)) {
                res.sendStatus(204);
            }
            else {
                res.status(404).json({ statusCode: 404, message: 'Suppression impossible, la tâche n\'existe pas' })
            }
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: 'Erreur db' });
        }

    }

}

module.exports = taskController;