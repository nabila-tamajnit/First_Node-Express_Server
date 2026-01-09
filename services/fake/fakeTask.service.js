const { tasks } = require("./fakeDb");

const fakeTaskService = {

    find : () => {
        return tasks;
    },

    findById : (id) => {
        return tasks.find(task => task.id === id);
    },

    findAssignedTo : (userName) => {
        return tasks.filter(task => task.to === userName);
    },

    findGivenBy : (userName) => {
        return tasks.filter(task => task.by === userName);
    },

    create : (taskToAdd) => {

        let idMax;
        if(tasks.length !== 0) {
            idMax = Math.max(...tasks.map(task => task.id));
        } else {
            idMax = 0;
        }

        taskToAdd.id = idMax + 1;
        taskToAdd.isDone = false;

        tasks.push(taskToAdd);

        return taskToAdd;
    },

    update : (id, task) => {
        const taskToUpdate = tasks.find(task => task.id === id);

        taskToUpdate.name = task.name;
        taskToUpdate.category = task.category;
        taskToUpdate.before = task.before;
        taskToUpdate.by = task.by;
        taskToUpdate.to = task.to;

        return taskToUpdate;
    },

    updateStatus : (id, status) => {
        const taskToUpdate = tasks.find(task => task.id === id);
        taskToUpdate.isDone = status;
        return taskToUpdate;
    },

    delete : (id) => {
        const index = tasks.findIndex(task => task.id === id);

        if(index === -1) {
            return false;
        }

        tasks.splice(index, 1);
        return true;

    }
}

module.exports = fakeTaskService;