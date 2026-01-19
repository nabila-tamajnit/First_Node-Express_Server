const Task = require('../../models/task.model');

const taskService = {

    //? ======================FIND======================================
    find: async () => {
        try {
            // Populate permet de rajouter les informations reliées à notre objet task grâce à la ref qu'on a établi dans le Schema
            const tasks = await Task.find()
                .populate({
                    path: 'categoryId',
                    select: { id: 1, name: 1, icon: 1 }
                })
                .populate({
                    path: 'fromUserId',
                    select: { id: 1, firstname: 1, lastname: 1 }
                })
                .populate({
                    path: 'toUserId',
                    select: { id: 1, firstname: 1, lastname: 1 }
                });
            return tasks;

        }
        catch (err) {

            console.log(err);
            throw new Error(err);

        }
        // try {
        //     const tasks = await Task.find();
        //     return tasks;
        // }
        // catch (err) {
        //     console.log(err);
        //     throw new Error(err);
        // }
    },
    //? ======================FINDBYID==================================
    findById: async (id) => {
        try {

            const task = await Task.findById(id)
                .populate({
                    path: 'categoryId',
                    select: { id: 1, name: 1, icon: 1 }
                })
                .populate({
                    path: 'fromUserId',
                    select: { id: 1, firstname: 1, lastname: 1 },
                })
                .populate({
                    path: 'toUserId',
                    select: { id: 1, firstname: 1, lastname: 1 }
                });
            return task;

        }
        catch (err) {
            console.log(err);
            throw new Error(err);

        }
        // try {
        //     const searchedTask = await Task.findById(id);
        //     return searchedTask;
        // }
        // catch (err) {
        //     console.log(err);
        //     throw new Error(err);
        // }
    },
    //? ======================FINDASSIGNEDTO============================
    findAssignedTo: async (userId) => {
        try {

            //Trouver toutes les tâches assignées au userId reçu en paramètre
            const tasks = await Task.find({ toUserId: userId })
                .populate({
                    path: 'categoryId',
                    select: { id: 1, name: 1, icon: 1 }
                })
                .populate({
                    path: 'fromUserId',
                    select: { id: 1, firstname: 1, lastname: 1 },
                })
                .populate({
                    path: 'toUserId',
                    select: { id: 1, firstname: 1, lastname: 1 }
                });
            return tasks;

        } catch (err) {
            console.log(err);
            throw new Error(err);
        }

        // try {
        //     const taskAssigned = await Task.find({ fromUserId: userId });

        //     return taskAssigned;
        // }
        // catch (err) {
        //     console.log(err);
        //     throw new Error(err);
        // }
    },
    //? ======================FINDGIVENBY===============================
    findGivenBy: async (userId) => {
        try {

            //Trouver toutes les tâches données par le userId reçu en paramètre
            const tasks = await Task.find({ fromUserId: userId })
                .populate({
                    path: 'categoryId',
                    select: { id: 1, name: 1, icon: 1 }
                })
                .populate({
                    path: 'fromUserId',
                    select: { id: 1, firstname: 1, lastname: 1 },
                })
                .populate({
                    path: 'toUserId',
                    select: { id: 1, firstname: 1, lastname: 1 }
                });
            return tasks;

        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
        // try {
        //     const taskGiven = await Task.find({ toUserId: userId });

        //     return taskGiven;
        // }
        // catch (err) {
        //     console.log(err);
        //     throw new Error(err);
        // }
    },
    //? ======================CREATE====================================
    create: async (task) => {
        try {
            const taskToAdd = Task(task);
            await taskToAdd.save();

            return taskToAdd;
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    //? ======================UPDATE====================================
    update: async (id, task) => {
        try { }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    //? ======================UPDATESTATUS==============================
    updateStatus: async (id, status) => {
        try { }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    //? ======================DELETE====================================
    delete: async (id) => {
        try {
            const deletedTask = await Task.findByIdAndDelete(id);
            if (deletedTask) {
                return true;
            } else {
                return false;
            }

            // const taskDelete = await Task.deleteOne({ _id : id })

            // if (taskDelete === -1) {
            //     return false;
            // }

            // return taskDelete;

            // Task.splice(index, 1);
            // return true;
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }
}

module.exports = taskService;