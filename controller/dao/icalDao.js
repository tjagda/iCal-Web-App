/**
 * Summary. The iCalendar DAO
 * Descrption. The data access object to do mariaDB operations to a local database
 * 
 * @author Josh Agda
 * @since 0.1
 */
const uuid = require('uuid');
const crypto = require('crypto');
const mariadb = require('mariadb');
const connectOpt = {
     host: 'localhost', 
     user:'tagda', 
     password: '',
     database: 'iCal'
};

const calPath = __dirname + '/../../cal/';

/**
 * Summary. Creates a new user in database
 * 
 * @since 0.1
 * @param {string} user New username string
 * @param {string} pass Password for new username
 */
async function createUser(user, pass) {
    let conn;

    try {
        conn = await mariadb.createConnection(connectOpt);
        console.log(user);
        console.log(pass);

        // Check if unique user
        var res = await conn.query("SELECT * FROM Users WHERE user=?", [user]);
        if (res.length > 0)
            return 0;
        
        // Add password hashing
        const hash = crypto.createHash('sha256').update(pass).digest('base64');

        // Insert into DB
        res = await conn.query("INSERT INTO Users (user, password) VALUES (?, ?)", [user, hash]);
        conn.end();

        return res['affectedRows'];
    } catch(err) {
        console.log(err);
        return 0;
    }
}

/**
 * Summary. Authenticates user by checking the database via select statement
 * 
 * @param {string} user Username string
 * @param {string} pass Password for username
 */
async function auth(user, pass) {
    let conn;
    var token = null;

    try {
        conn = await mariadb.createConnection(connectOpt);
        const hash = crypto.createHash('sha256').update(pass).digest('base64');
        let res = await conn.query("SELECT * FROM Users WHERE user=? AND password=?", [user, hash]);

        // Add token creation
        if (res.length) {
            res = await conn.query("SELECT token, tokenCreated FROM Users WHERE user=?", [user]);

            // Check if token made within last hour
            lastHourTime = Date.now() - 3600000;
            if (res[0]['tokenCreated'] && res[0]['tokenCreated'] > lastHourTime) {
                token = res[0]['token'];    // Set token from a previously made one
            } else {
                // Make new token and update DB
                token = uuid.v4();
                res = await conn.query("UPDATE Users SET token=? WHERE user=?", [token, user]);     // Add checks?
                res = await conn.query("UPDATE Users SET tokenCreated=NOW() WHERE user=?", [user]);
            }
        }

        conn.end();
    } catch(err) {
        console.log(err);
    }

    return token;
}

/**
 * Summary. Resets the password to another password chosen by user
 * 
 * @param {string} user Username that needs a new password
 * @param {string} pass New password for username
 */
async function resetPass(user, pass) {
    let conn;

    try {
        conn = await mariadb.createConnection(connectOpt);

        const hash = crypto.createHash('sha256').update(pass).digest('base64');
        let res = await conn.query("UPDATE Users SET password=? WHERE user=?", [hash, user]);
        conn.end();

        // Return affected rows (0 => error)
        return res['affectedRows'];
    } catch(err) {
        console.log(err);
        return 0;
    }
}


/**
 * Summary. Get calendar using the token generated on user auth
 * 
 * @param {string} token User token to find calendar with
 */
async function getCal(token) {
    let conn;
    
    try {
        conn = await mariadb.createConnection(connectOpt);

        // Get the file name
        let res = await conn.query("SELECT calendarPath, tokenCreated FROM Users WHERE token=?", [token]);
        conn.end();

        lastHourTime = Date.now() - 3600000;
        if (res.length && res[0]['tokenCreated'] && res[0]['tokenCreated'] > lastHourTime) {
            fileName = res[0]['calendarPath'];
            return calPath + fileName;
        }
    } catch(err) {
        console.log(err);
    }
    return null;
}


/**
 * Summary. Stores the iCal file object and saves the path on DB
 * 
 * @param {string} user Username of user uploading iCal file
 * @param {object} cal iCal file object
 */
async function saveCal(token, cal) {
    let conn;
    let res = null;
    
    try {
        conn = await mariadb.createConnection(connectOpt);

        // Save it based on DB id
        res = await conn.query("SELECT id FROM Users WHERE token=?", [token]);

        lastHourTime = Date.now() - 3600000;
        if (res.length && res[0]['tokenCreated'] && res[0]['tokenCreated'] > lastHourTime) {
            id = res[0]['id'];
            fileName = id + '.ics';
            cal.mv(calPath + fileName, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log(fileName + ' is uploaded for ' + user);
                }
            });
    
            // Save path on DB
            res = await conn.query("UPDATE Users SET calendarPath=? WHERE user=?", [fileName, user]);
        }
        conn.end()
    } catch(err) {
        console.log(err);
    }

    if (res) {
        return res['affectedRows'];
    }
    return 0;
}


module.exports = {
    createUser: createUser,
    auth: auth,
    resetPass: resetPass,
    getCal: getCal,
    saveCal: saveCal
};