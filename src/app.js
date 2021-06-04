const express = require('express');
const actorRoutes = require('./routes/actors');
const directorRoutes = require('./routes/directors');
const userRoutes = require('./routes/users');
const genreRoutes = require('./routes/genres');
const contentRoutes = require('./routes/contents');
const logger = require('morgan');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../swagger.json');
const cors = require("cors");
const helmet = require('helmet');

const app = express();

app.use(express.json());

app.use(cors());
app.use(helmet());

app.set('views', '/src/views');

app.use(express.static(__dirname + '/uploads'));

// Endpoints
app.get("/", (req, res) => res.json({"Imdb_api": "1.0.0"}));
app.use("/api/v1/", contentRoutes);
app.use("/api/v1/", directorRoutes);
app.use("/api/v1/", genreRoutes);
app.use("/api/v1/", actorRoutes);
app.use("/api/v1/", userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// errors handler
app.use((err, req, res, next) => {
    console.log(err.message);
    switch(err.name){
        case 'SequelizeValidationError':
            const errObj = {message: "Validation error", errors: []};
            err.errors.map(er => {
                errObj.errors.push({[er.path]: er.message});
            });
            return res.status(403).send(errObj);
        case 'SequelizeUniqueConstraintError':
            return res.status(403).send({message: "There is another register with the same value"});
        case 'TokenExpiredError':
            return res.status(401).send({message: "The token is expired"});
        default:
            return res.status(500).send('Server error');
    }
});

app.use(logger('combined', {stream: fs.createWriteStream('./access.log', {flags: 'a'})}));

module.exports = app