const db = require('./db');

const getQuestion = (id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM questions WHERE id = ?', [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        })
    })
}

const getAllQuestions = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM questions', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

const getTestCases = (id) => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM testcases WHERE question_id = ?', [id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = {
    getQuestion,
    getAllQuestions,
    getTestCases
}