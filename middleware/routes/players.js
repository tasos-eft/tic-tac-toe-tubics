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
     *  Search if player record exists. 
     *  If it does, return player, 
     *  else create new player record. 
     */

    console.log('create-player body', req.body);

    const players = req.body;
    const resArray = [];
    let result = {};

    players.forEach(player => {
        db.get().collection('players')
            .find({
                name: player.name
            })
            .toArray((error, data) => {
                if (error) {
                    next();
                };
                /* no player data */
                if (data.length === 0) {
                    db.get().collection('players').insert(player, (err, record) => {
                        if (err) {
                            next();
                        } else {
                            result = record;
                            console.log('\n - create new player - \n', record);
                        }
                    });
                } else {
                    /* player is found */
                    result = data;
                    console.log('\n - find player by name - \n', data);
                }
            });
        console.log('\n - result - \n', result);
        resArray.push(result);
    });
    return res.json({ results: resArray });

});

router.post('/find-player/', (req, res, next) => {
    /* 
     * find specific player
     */
    console.log(req.body.name);
    db.get().collection('players')
        .find({
            name: player.name
        })
        .toArray((error, data) => {
            if (error) {
                next();
            };
            /* no player data */
            if (data.length === 0) {
                db.get().collection('players').insert(player, (err, record) => {
                    if (err) {
                        next();
                    } else {
                        result = record;
                        console.log('\n - create new player - \n', record);
                    }
                });
            } else {
                /* player is found */
                result = data;
                console.log('\n - find player by name - \n', data);
            }
        });
    return res.json({
        player: 'all players'
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