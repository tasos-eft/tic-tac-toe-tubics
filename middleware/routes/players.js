/*jshint esversion: 6 */

// customers API ROUTES
const express = require('express');
const router = express.Router();
/* mongoDB database */
const db = require('../utilities/mongodb-utility');
/* custom helpers */
const helper = require('../utilities/helper');

router.post('/create-player/', (req, res) => {
    /* 
     * 
     */
});

router.get('/read-player/', (req, res) => {
    /* 
     * 
     */
});

router.post('/update-player/', (req, res) => {
    /* 
     * 
     */
});

router.post('/delete-player/', (req, res) => {
    /* 
     * 
     */
});

module.exports = router;