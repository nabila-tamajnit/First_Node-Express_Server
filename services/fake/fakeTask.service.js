const { tasks } = require("./fakeDb");

const fakeTaskService = {

    // Récupérer toutes les tâches de notre """db"""
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
        //normalement ce sera automatique en db mais on va devoir lui calculer un id
        //chercher l'id max dans le tableau et faire +1

        //#region explications idMax
        // tasks.map(task => task.id)
        // transforme notre tableau d'objet en tableau d'id
        // |-> [{ id : 1, ...}, {id : 2...}] => [1, 2]

        // Math.max(2,18,7,1) -> trouve la valeur max parmi des nombres
        // notre map du dessus nous donne un tableau de nombre et Math.max n'est pas capable de trouver le max dans un tableau
        // Math.max(tasks.map(task => task.id)) => Math.max([1,2]) => Fail
        // On doit donc décomposer notre tableau avec les ...
        // Math.max(...tasks.map(task=> task.id)) => Math.max(...[1,2]) => Math.max(1,2)
        //#endregion

        let idMax;
        if(tasks.length !== 0) {
           idMax = Math.max( ...tasks.map(task => task.id) );
        } else {
           idMax = 0;
        } 
        
        taskToAdd.id = idMax + 1;
        taskToAdd.isDone = false; /* on la fait en non effectuée par défaut à la création */

        tasks.push(taskToAdd);

        //On renvoie la nouvelle tâche
        return taskToAdd;
     },

     updateStatus : (id, status) => {
        //on cherche la bonne tâche
        const taskToUpdate = tasks.find(task => task.id === id);

        //on modifie son état
        taskToUpdate.isDone = status;

        //on renvoie la tâche modifiée
        return taskToUpdate;
     },

     update : (id, task) => {
        //trouver la tâche
        const taskToUpdate = tasks.find(task => task.id === id);

        //on fait les modifications
        //on modifie trèèèès rarement l'id d'un élément
        //ici, on va faire le choix de tout modifier sauf le statut
        taskToUpdate.name = task.name;
        taskToUpdate.category = task.category;
        taskToUpdate.before = task.before;
        taskToUpdate.by = task.by;
        taskToUpdate.to = task.to;

        return taskToUpdate;
     },

     delete : (id) => {
        // Chercher l'indice de l'élément à supprimer
        const index = tasks.findIndex(task => task.id === id);
        // si l'id n'existe pas, l'index sera -1
        if(index === -1) {
            return false; // on va renvoyer faux pour indiquer que la suppression ne s'est pas faite
        }
        //si l'index n'est pas -1, on peut faire la suppression
        tasks.splice(index, 1);
        return true; //on renvoie true pour indiquer que la suppression s'est faite correctement
     }

}

module.exports = fakeTaskService;