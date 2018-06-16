/*jshint esversion: 6 */
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
// MongoDB Utility
const db = require('./middleware/utilities/mongodb-utility');
// API routes
const players = require('./middleware/routes/players');
/* custom helpers */
const helper = require('./middleware/utilities/helper');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create link to Angular build directory, dist output folder
const distDir = __dirname + '/dist/';
const distIndex = __dirname + '/dist/index.html';

// Gzip
app.use(compression());
// static content
app.use(express.static(distDir));

// API EndPoints
app.use('/players', players);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(distIndex);
});

//Set Port
const port = process.env.PORT || 8080;
app.set('port', port);

// Connect to the database before starting the application server.
const dbUri = helper.constants.dbUri;

db.connect(dbUri, connectionError => {
    if (connectionError) {
        console.log('unable to connect to database .', connectionError);
        process.exit(1);
    } else {
        console.log('database connection ready');
        const server = http.createServer(app);
        server.listen(port);
        // add error handler
        server.on('error', error => {
            console.log('ERROR', error);
        });
        // start listening on port
        server.on('listening', () => {
            console.log(`app is running on http://localhost:${port}/ `);
        });
    }
});