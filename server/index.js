const fs = require('fs');
const sharp = require('sharp');
const express = require('express');
const app = express();


// //! API


app.use(express.json());

app.get('/imagesCats', (req, res) => {
    const id = req.query.id;
    
    if (id) {
        getImageById(id)
            .then((image) => {
                if (image) {
                    res.setHeader('Content-Type', 'image/png');
                    res.send(image);
                } else {
                    res.status(404).json({ message: 'Cat not found' });
                }
            })
            .catch((error) => {
                console.error('Ошибка:', error);
                res.status(500).json({ error: 'Internal server error' });
            });
    } else {
        res.status(400).json({ message: `id: '${id}' is incorrect` });
    }
});


app.get('/cats', (req, res) => {
    const id = req.query.id;
    if (id) {
        getNameById(id)
            .then((name) => {
                getDescriptionById(id)
                    .then((description) => {
                        getAuthorById(id)
                            .then((author) => {
                                res.json({ name: `${name}`, description: `${description}`, author: `${author}` });
                            })
                            .catch((error) => {
                                console.error('Ошибка:', error);
                            })
                    })
                    .catch((error) => {
                        console.error('Ошибка:', error);
                    })
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            })

    } else {
        res.json({ message: `id: '${id}' incorrect` });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});



// //! DataBase

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('db/cats.db');

function getImageById(id) {
    return new Promise((resolve, reject) => {
        const query = `SELECT image FROM cats WHERE id = ?`;

        db.get(query, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row ? row.image : null);
            }
        });
    });
}

function getNameById(id) {
    return new Promise((resolve, reject) => {
        const query = `SELECT name FROM cats WHERE id = ?`;

        db.get(query, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row ? row.name : null);
            }
        });
    });
}

function getDescriptionById(id) {
    return new Promise((resolve, reject) => {
        const query = `SELECT description FROM cats WHERE id = ?`;

        db.get(query, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row ? row.description : null);
            }
        });
    });
}

function getAuthorById(id) {
    return new Promise((resolve, reject) => {
        const query = `SELECT author FROM cats WHERE id = ?`;

        db.get(query, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row ? row.author : null);
            }
        });
    });
}


// //! Bin to PNG
