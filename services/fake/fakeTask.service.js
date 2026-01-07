const { tasks } = require("./fakeDb");

const fakeTaskService = {

    find : () => {
        return tasks;
    },

    findById : (id) => {
        return tasks.find(task => task.id === id);
    },

    create : (taskToAdd) => {
        const idMax = Math.max(...tasks.map(task => task.id));

        taskToAdd.id = idMax + 1;
        taskToAdd.isDone = false;

        tasks.push(taskToAdd);

        return taskToAdd;
    }
}

module.exports = fakeTaskService;