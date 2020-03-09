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
    var user = req.body['user'];
    var pass = req.body['pass'];

    if (user && pass) {
        if (await icalDao.createUser(user, pass)) {
            // Output serverside
            console.log('User ' + user + ' created successfully');

            // Return JSON
            res.json({
                success: true
            });
            return;
        }
    }

    res.json({
        success: false
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
    var user = req.body['user'];
    var pass = req.body['pass'];

    if (user && pass){
        token = await icalDao.auth(user, pass);
        if (token){
            // Output serverside
            console.log(user + ' logged in');
            
            // Return JSON
            res.json({
                token: token,
                success: true
            });
            return;
        }
    }

    res.json({
        success: false
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
    var user = req.body['user'];
    var pass = req.body['pass'];

    // TODO: Change reset pass to use a reset password token 
    // to be more secure (another DB table)
    if (user){
        if (await icalDao.resetPass(user, pass)) {
            res.json({
                success: true
            });
            return;
        }
    }

    res.json({
        success: false
    });
});

module.exports = router;