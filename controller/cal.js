/**
 * Summary. The /cal express route
 * Description. Endpoints to access the iCal DAO and perform operations with the ics file
 * 
 * @author Josh Agda
 * @since 0.1
 */
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const router = express.Router();
const icalDao = require('./dao/icalDao');

router.use(bodyParser.json());
router.use(fileUpload());

/**
 * Summary. Returns the ics file to front end
 * 
 * @since 0.1
 */
router.get('/get', async (req, res) => {
    // TODO:
    res.json({
        message: 'Getting ics calendar!'
    });
});

/**
 * Summary. Saves the ics file into database
 * 
 * @since 0.1
 */
router.post('/store', async (req, res) => {
    var user = req.body['user'];
    var cal = req.files ? req.files.cal : null;

    if (user && cal) {
        if (await icalDao.saveCal(user, cal)) {
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