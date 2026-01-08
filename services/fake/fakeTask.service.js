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
        return tasks.filter(task => task.to === userName);
    },

    create : (taskToAdd) => {
        const idMax = Math.max(...tasks.map(task => task.id));

        taskToAdd.id = idMax + 1;
        taskToAdd.isDone = false;

        tasks.push(taskToAdd);

        return taskToAdd;
    },

    update : (id) => {

    },

    updateStatus : (id) => {

    },

    delete : (id) => {

    }
}

module.exports = fakeTaskService;