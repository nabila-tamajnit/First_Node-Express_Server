const userController = require('../controllers/user.controller');
const authenticationMiddleware = require('../middlewares/auth/authentication.middleware');

const userRouter = require('express').Router();

userRouter.route('/')
    .get( authenticationMiddleware(),
          userController.getAll)

module.exports = userRouter;