/**
 * Summary. The /cal express route
 * Description. Endpoints to access the iCal DAO and perform operations with the ics file
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
 * Summary. Returns the ics file to front end
 * 
 * @since 0.1
 */
router.get('/get', (req, res) => {
    // TODO:
    res.json({
        message: 'Getting ics calendar!'
    });
});

/**
 * Summary. Saves the ics file into database
 */
router.post('/store', (req, res) => {
    // TODO:
    res.json({
        message: 'Storing ics calendar!'
    });
});

module.exports = router;