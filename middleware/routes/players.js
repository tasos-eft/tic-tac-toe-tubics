/*jshint esversion: 6 */

// customers API ROUTES
const express = require('express');
const router = express.Router();
/* mongoDB database */
const db = require('../utilities/mongodb-utility');
/* custom helpers */
const helper = require('../utilities/helper');

router.post('/create-player/', (req, res, next) => {
    db.get().collection('players').insert(player, (err, record) => {
        if (err) {
            next();
        } else {
            result = record;
            console.log('\n - create new player - \n', record);
        }
    });
});

router.post('/find-player/', (req, res, next) => {
    /* 
     * find specific player
     */
    let result = {};
    console.log(req.body.name);
    db.get().collection('players')
        .find({
            name: req.body.name
        })
        .toArray((error, data) => {
            if (error) {
                next();
            };
            /* no player data */
            if (data.length > 0) {
                /* player is found */
                result = data;
                console.log('\n - find player by name - \n', data);
                return res.json({ player: result });
            }
        });
});

router.get('/read-players/', (req, res, next) => {
    /* 
     * get all players
     */
    return res.json({
        player: 'all players'
    });
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