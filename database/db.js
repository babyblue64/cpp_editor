const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database Error: ', err);
    }
    else {
        console.log('Connected to database');

        db.run(`CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            function_name TEXT NOT NULL,
            description TEXT NOT NULL,
            outer_shell TEXT NOT NULL
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS testcases (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question_id INTEGER,
            input TEXT NOT NULL,
            expected_output TEXT NOT NULL,
            FOREIGN KEY (question_id) REFERENCES questions (id)
        )`);
    }
});

module.exports = db;