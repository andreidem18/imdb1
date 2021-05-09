const express = require('express');
const actorRoutes = require('./routes/actors');
const userRoutes = require('./routes/users');
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


// Endpoints
app.use("/api/v1/", actorRoutes);
app.use("/api/v1/", userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// errors handler
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send('Something is wrong');
});
app.use(logger('combined', {stream: fs.createWriteStream('./access.log', {flags: 'a'})}));

module.exports = app