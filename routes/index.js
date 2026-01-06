const taskRouter = require('./task.router');
const categoryRouter = require('./category.router');


const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Bienvenue sur notre API de gestion de tâches", 200)
});


router.use('/tasks', taskRouter);

router.use('/categories', categoryRouter);

module.exports = router;
