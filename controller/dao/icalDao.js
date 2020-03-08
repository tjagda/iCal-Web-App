/**
 * Summary. The iCalendar DAO
 * Descrption. The data access object to do mariaDB operations to a local database
 * 
 * @author Josh Agda
 * @since 0.1
 */
const crypto = require('crypto');
const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'localhost', 
     user:'tagda', 
     password: '',
     database: 'iCal',
     connectionLimit: 5
});

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
        conn = await pool.getConnection();
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

    try {
        conn = await pool.getConnection();
        const hash = crypto.createHash('sha256').update(pass).digest('base64');
        const res = await conn.query("SELECT * FROM Users WHERE user=? AND password=?", [user, hash]);

        // TODO: Add token creation
        return res.length;
    } catch(err) {
        console.log(err);
        return 0;
    }
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
        conn = await pool.getConnection();

        const hash = crypto.createHash('sha256').update(pass).digest('base64');
        const res = await conn.query("UPDATE Users SET password=? WHERE user=?", [hash, user]);

        // Return affected rows (0 => error)
        return res['affectedRows'];
    } catch(err) {
        console.log(err);
        return 0;
    }
}


// TODO: Add get calendar


// TODO: Add save calendar


module.exports = {
    createUser: createUser,
    auth: auth,
    resetPass: resetPass
};