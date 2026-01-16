const Task = require('../../models/task.model');

const taskService = {

    //? ======================FIND======================================
    find: async () => {
        try {
            const tasks = await Task.find();
            return tasks;
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    //? ======================FINDBYID==================================
    findById: async (id) => {
        try {
            const searchedTask = await Task.findById(id);
            return searchedTask;
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    //? ======================FINDASSIGNEDTO============================
    findAssignedTo: async (userId) => {
        try {
            const taskAssigned = await Task.find({ fromUserId: userId });

            return taskAssigned;
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    //? ======================FINDGIVENBY===============================
    findGivenBy: async (userId) => {
        try {
            const taskGiven = await Task.find({ toUserId: userId });

            return taskGiven;
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
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
            const taskDelete = await Task.deleteOne({ _id : id })

            if (taskDelete === -1) {
                return false;
            }

            return taskDelete;

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