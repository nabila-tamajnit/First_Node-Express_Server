const taskRouter = require('./task.router');
const categoryRouter = require('./category.router');
const authRouter = require('./auth.router');


const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Bienvenue sur notre API de gestion de tâches", 200)
});


router.use('/tasks', taskRouter);

router.use('/categories', categoryRouter);

router.use('/auth', authRouter);

module.exports = router;
