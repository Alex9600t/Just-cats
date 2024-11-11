const fs = require('fs');
const sharp = require('sharp');
const express = require('express');
const app = express();


// //! API

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


app.use(express.json());

app.get('/errorCats', (req, res) => {
    const id = Math.floor(Math.random() * 10) + 1;

    getCatsError404(id)
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
});

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
                                getMaxId()
                                    .then((maxid) => {
                                        res.json({ name: `${name}`, description: `${description}`, author: `${author}`, id: `${id}`, maxid: `${maxid}` });
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

function getCatsError404(id) {
    return new Promise((resolve, reject) => {
        const query = `SELECT image FROM errorCats WHERE id = ?`;

        db.get(query, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row ? row.image : null);
            }
        });
    });
}

function getMaxId() {
    return new Promise((resolve, reject) => {
        const query = `SELECT MAX(id) AS last_id FROM cats`;

        db.get(query, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row ? row.last_id : null);
            }
        });
    });
}

// Hiii!!
// How are u??

// //! Bin to PNG

// btw, ТВОЙ КОД ПОЛНАЯ ХУЙНЯ
// p.s. пласти >:(