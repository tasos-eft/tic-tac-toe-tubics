/*jshint esversion: 6 */

// customers API ROUTES
const express = require('express');
const router = express.Router();
/* mongoDB database */
const db = require('../utilities/mongodb-utility');
/* custom helpers */
const helper = require('../utilities/helper');

router.post('/create-player/', (req, res, next) => {
    /* 
     * 
     */
    let query = {};
    let limit = 20;

    console.log('create-player body', req);

    return res.json({ player: 'John Corfas' });

    // db.get().collection('players').insert({ item: "card", qty: 15 });
});


router.get('/read-players/', (req, res, next) => {
    /* 
     * get all players
     */
    // db.get().collection('players')
    //     .find({ name: req.name })
    //     .then(player => {
    //         console.log(player);

    //         if (!player) { return res.sendStatus(401); }

    //         return res.json({ player: player });
    //     }).catch(next);
    return res.json({ player: 'Bane' });
});

router.post('/find-player/', (req, res, next) => {
    /* 
     * find one player
     */
    console.log('find-player body', req.body);
    db.get().collection('players')
        .find({ name: req.body.name })
        .toArray((error, results) => {
            if (error) {
                // res.status(500).json({ 'error': error });
                next();
            };
            console.log('\n - find player by name results - \n', results);
            /* no player data */
            if (results.length === 0) { return res.status(204).json({ player: null }); }
            /* player is found */
            return res.json({ player: 'Pablo Garcia' });
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