const categoryRouter = require('express').Router();

categoryRouter.get('/', (req, res) => {
    res.send('Voici toutes les catégories', 200);
})

categoryRouter.get('/:id', (req, res) => {
    res.send(`Voici la catégorie ${req.params.id}`, 200);
})

categoryRouter.post('/', (req, res) => {
    const categoryToInsert = req.body;
    res.send(categoryToInsert, 201);
})

categoryRouter.put('/:id', (req, res) => {
    const categoryId = req.params.id;
    const categoryUpdate = req.body;
    categoryUpdate.id = categoryId;

    res.send( categoryUpdate , 200)
})

categoryRouter.delete('/:id', (req, res) => {
    res.sendStatus(204);
})

module.exports = categoryRouter;