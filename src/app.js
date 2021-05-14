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

app.use(express.static('uploads'));

// Endpoints
app.use("/api/v1/", contentRoutes);
app.use("/api/v1/", directorRoutes);
app.use("/api/v1/", genreRoutes);
app.use("/api/v1/", actorRoutes);
app.use("/api/v1/", userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// errors handler
app.use((err, req, res, next) => {
    console.log(err.message);
    if(err.name === "SequelizeValidationError" || err.statusCode === 400 ){
        const errObj = {};
        err.errors.map(er => {
            errObj[er.path] = er.message;
        })
        return res.status(400).send(errObj);
    }
    return res.status(500).send('Something is wrong');
});
app.use(logger('combined', {stream: fs.createWriteStream('./access.log', {flags: 'a'})}));

module.exports = app