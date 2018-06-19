/*jshint esversion: 6 */

// customers API ROUTES
const express = require('express');
const router = express.Router();
/* mongoDB database */
const db = require('../utilities/mongodb-utility');
/* custom helpers */
const helper = require('../utilities/helper');

router.post('/find-and-update-player/', (req, res, next) => {
    /* 
     * find specific player
     */
    let result = null;
    console.log(req.body.name);
    db.get().collection('players')
        .find({
            name: req.body.name
        })
        .toArray((error, data) => {
            if (error) {
                next();
            };
            console.log('\n - find player by name - \n', data);
            /* player is found */
            if (data.length > 0) {
                result = data[0];
                db.get().collection('players').update({ name: result.name }, {
                    $set: { "score": result.score + 1 },
                    $currentDate: { lastModified: true }
                });
            } else {
                player = req.body;
                player.score += 1;
                db.get().collection('players').insert(player, (err, record) => {
                    if (err) {
                        next();
                    } else {
                        result = record.ops[0];
                        console.log('\n - create new player - \n', record);
                    }
                });
            }
            return res.json(result);
        });
});

router.get('/read-players/', (req, res, next) => {
    /* 
     * get all players
     */
    db.get().collection("players").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });
});

// router.post('/create-player/', (req, res, next) => {
//     /* 
//      * 
//      */
// });

// router.post('/update-player/', (req, res) => {
//     /* 
//      * 
//      */
// });

// router.post('/delete-player/', (req, res) => {
//     /* 
//      * 
//      */
// });

module.exports = router;