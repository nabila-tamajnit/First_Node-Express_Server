const categoryRouter = require('express').Router();

categoryRouter.route('/')
    .get((req, res) => {
        res.send('Voici toutes les catégories', 200);
    })
    .post((req, res) => {
        const categoryToInsert = req.body;
        res.send(categoryToInsert, 201);
    })

categoryRouter.route('/:id')
    .get((req, res) => {
        res.send(`Voici la catégorie ${req.params.id}`, 200);
    })
    .put((req, res) => {
        const categoryId = req.params.id;
        const categoryUpdate = req.body;
        categoryUpdate.id = categoryId;

        res.send( categoryUpdate , 200)
    })
    .delete((req, res) => {
        res.sendStatus(204);
    })

module.exports = categoryRouter;