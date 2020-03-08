/**
 * Summary. The /users express route
 * Description. Endpoints to access the iCal DAO and perform user operations
 * 
 * @author Josh Agda
 * @since 0.1
 */
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const icalDao = require('./dao/icalDao');

router.use(bodyParser.json());

/**
 * Summary. Creates a new user using DAO 
 * 
 * @since 0.1
 * @param {string} user Username to login with
 * @param {string} pass Password for the specified username
 */
router.post('/create', (req, res) => {
    user = req.body['user'];
    pass = req.body['pass'];

    if (user && pass)
        icalDao.createUser(user, pass);

    res.sendStatus(200);
});

/**
 * Summary. Authenticates credentials by checking the DAO
 * 
 * @since 0.1
 * @param {string} user Username to login with
 * @param {string} pass Password for the specified username
 */
router.post('/login', (req, res) => {
    user = req.body['user'];
    pass = req.body['pass'];
    console.log(req.body);

    if (user && pass){
        if (icalDao.auth(user, pass)){
            // TODO: Change to token and add to cookie
            console.log('logged in');
        }
    }

    res.sendStatus(200);
});

/**
 * Summary. Resets the password of a user to a new one
 * 
 * @since 0.1
 * @param {string} user Username to login with
 * @param {string} pass New password for the specified username
 */
router.post('/resetPass', (req, res) => {
    user = req.body['user'];
    pass = req.body['pass'];

    if (user){
        icalDao.resetPass(user, pass);
        // TODO: Check output
    }

    // TODO: Add message
    res.sendStatus(200);
});

module.exports = router;