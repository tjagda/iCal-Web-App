/**
 * Summary. Main js file to launch routes for iCal application
 * 
 * @author Josh Agda
 * @since 0.1
 */
const express = require('express');
const app = express();
const users = require('./users');
const cal = require('./cal');

// Route to other modules
app.use('/users', users);
app.use('/cal', cal);
 
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
