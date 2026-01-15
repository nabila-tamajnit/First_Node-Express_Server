const express = require('express');
const server = express();

const { PORT, DB_CONNECTION } = process.env;

server.use(express.json());

//? -----------Utilisation de l'app-middleware---------------
const logMiddleware = require('./middlewares/log.middleware');
server.use(logMiddleware());
//? -----------------------------------------------------------

//? ---------------------------------------Connexion DB-----------------------------------------
const mongoose = require('mongoose')
server.use( async (req, res, next) => {
    try {
        await mongoose.connect(DB_CONNECTION, {
            dbName : 'TaskManager'
        });
        console.log("💾 Connection Successfully connect to the DB !");
        next();
        
    } catch(err){
        console.log(`❌ connection Failed \n[Reason]\n ${err}` );

        res.status(500).json({ statusCode : 500, message : 'Impossible de se sonnecter à la base de données !' });
    }
})
//? --------------------------------------------------------------------------------------------

const router = require('./routes');
server.use('/api', router);

server.listen(PORT, () => {
    console.log(`🚀 Express Server started on port ${ PORT }`);  
})