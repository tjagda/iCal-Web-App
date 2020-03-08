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
router.post('/create', async (req, res) => {
    user = req.body['user'];
    pass = req.body['pass'];

    if (user && pass) {
        if (await icalDao.createUser(user, pass)) {
            console.log('User ' + user + ' created successfully');
            res.json({
                message: 'Success'
            });
            return;
        }
    }

    res.json({
        message: 'User not created'
    });
});

/**
 * Summary. Authenticates credentials by checking the DAO
 * 
 * @since 0.1
 * @param {string} user Username to login with
 * @param {string} pass Password for the specified username
 */
router.post('/login', async (req, res) => {
    user = req.body['user'];
    pass = req.body['pass'];
    console.log(req.body);

    if (user && pass){
        if (await icalDao.auth(user, pass)){
            console.log(user + ' logged in');
            res.json({
                // TODO: Change to token and add to cookie
                message: 'Success'
            });
            return;
        }
    }

    res.json({
        message: 'Unsuccessful'
    });
});

/**
 * Summary. Resets the password of a user to a new one
 * 
 * @since 0.1
 * @param {string} user Username to login with
 * @param {string} pass New password for the specified username
 */
router.post('/resetPass', async (req, res) => {
    user = req.body['user'];
    pass = req.body['pass'];

    if (user){
        if (await icalDao.resetPass(user, pass)) {
            res.json({
                message: 'Success'
            });
            return;
        }
    }

    res.json({
        message: 'Unsuccessful'
    });
});

module.exports = router;