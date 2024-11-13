// *********************************************** //
// Проект полностью готов тут: https://justcats.bduidan.ru
// *********************************************** //
// Это простая публичная серверная часть БЕЗ логики с бд
// Это уже будет на http://api.bduidan.ru:3100
// *********************************************** //




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

app.get('/likeCats', (req, res) => {

    // Это уже будет на http://api.bduidan.ru:3100

    const id = req.query.id;
    const ip = req.query.ip;

    if (ip && id) {
        likeCats(ip, id)
            .then((nextData) => {
                res.json({ text: `Вы успешно проголосовали под ip: ${ip} за котика под id: ${id}. Вы сможите проголосовать только после ${nextData}` });
            })
            .catch((error) => {
                console.error('Ошибка:', error);
                res.status(500).json({ error: 'Internal server error' });
            });

    } else {
        res.json({ message: `ip: '${ip}' is incorrect OR id: '${id}' is incorrect` });
    }
});

app.get('/dislikeCats', (req, res) => {

    // Это уже будет на http://api.bduidan.ru:3100


    const ip = req.query.ip;
    const origin = req.query.origin;

    if (ip) {
        blockUserByIP(ip)
            .then(() => {
                res.json({ text: `Вы были забанены по IP (${ip}) в связи с нарушением правил пользовательского соглашение под номером 1.3 (Смотреть тут: -> ${origin}?elua=1 <- )` });
            })
            .catch((error) => {
                console.error('Ошибка:', error);
                res.status(500).json({ error: 'Internal server error' });
            });
    } else {
        res.json({ message: `ip: ${ip} неверный, но я все равно тебя забаню!` });
    }
});

app.get('/elua', (req, res) => {
    res.json({
        elua1Name: `Cats Only`,
        elua1: `Вход в Just Cats разрешен только котикам, котоподобным юзерам интернута и их верным последователям. Если вы НЕ являетесь котиком или не обладаете хотя бы одним котоподобным качеством, нам будет грустно, но придется попрощаться! Meow ^>_<^. (если Вы считайте, что сможите пройти IQ тест, и в ответе получито болье, чем 'No internet connection', тогда вы можите наплевать ТОЛЬКО на это правило).`,
        elua2Name: `Only cats`,
        elua2: `Все публикации должны быть строго КОрТИнКАМИ (Или вашей аватаркой, имеющие котоподобные детали). Все остальное - НАРУШЕНИЕ, которое караеться блокировкой по IP!`,
        elua3Name: `Dont hate cats!`,
        elua3: `Внимание! Ненависть к котикам строго ЗАПРЕЩЕНА!!!1!! Если Вы поставите дизлайк котику, тогда мы будем вынуждены заблокировать ВАС по IP!`,
        elua4Name: `Cats are God`,
        elua4: `Все котики божественны, и это не обсуждается. Поддержание этого священного статуса - обязанность каждого пользователя. Если вы хотите это оспорить - вам не место среди котов!`,
        elua5Name: `if (cats !== cats){document.URL = 'http://JustNoCats.ru'}`,
        elua5: `Если вы уверены, что пользователь отправил фото НЕ котика (или НЕ котоподобного существа), хотя на фото есть котик (или котоподобное существо), тогда вам место на JustNoCats.ru (Социальная сеть, где нет никого..)!`,
        eluaDescription: `Даааа.. Забыл сказать... При нарушении пользовательского соглашения выш емаил будет удален из за 984293840342940239 фото котиков/секунду, которые повалят ваше интернет соединение. `
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

function blockUserByIP(id) {

    // Это уже будет на http://api.bduidan.ru:3100

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

function likeCats(ip, id) {

    // Это уже будет на http://api.bduidan.ru:3100

}

// *********************************************** //
//* Жил да был фронтендер Дима, *//
//* Хорошо он бэк знал, *//
//* Изучал JS он долго, *//
//* Просил помощи у всех. *//
//* И в итоге, спустя годы, *//
//* Стал он кодить лучше всех.

//* Изучал он фреймворки, *//
//* И React, и Electron -- *//
//* Он в итоге кодить лучше всех друзей стал!

//* И вот в один прекрасный вечер *//
//* Попросил его друг: *//
//* "Дима, слушай, тут проблемка… *//
//* Я же в бэке не селен… *//
//* Помоги, позязя, другу, помоги, прошу с API!"

//* Что же делать -- помогать? *//
//* Ну, давай тогда поможем… *//
//* Кинь, ты, ссылку на лайфшеир, *//
//* Чтобы я помог тебе.

//* Друг кинул лайфшеир, и в итоге говорит: *//
//* "Тут проблемка небольшая…" *//
//* Дополняет общий текст: *//
//* "API не отдает мне картинку одну…"

//* Как же друг тупил… *//
//* Он картинку отдавал в виде текста… *//
//* "Вот оно!" -- сказал друг. *//
//* "Что, доволен?" -- с ухмылкой Дима говорит. *//
//* "Да, вполне," -- с ухмылкой друг отвечает.

//* И тогда Дима по приколу *//
//* Комментарий в коде оставил: *//
//* "Hiii!!, How are u??" -- первым текстом Дима другу дал вопрос. *//
//* Не услышав ответа, Дима в коде дописал: *//
//* "btw, ТВОЙ КОД ПОЛНАЯ ХУЙНЯ".

//* Дима думал: *//
//* "Ну за что? Ну почему? Это же не надо так…", *//
//* И в итоге написал новый комментарий: *//
//* "p.s. пласти >:(".

//* Душа Димы была спокойна, и не знал он бед своих, *//
//* Как друг его запушил коммит на гите. *//
//* Друг заметил слишком поздно, *//
//* И себе он так сказал: *//
//* "Почему бы не оставить это в коде своем? *//
//* Но поставлю сверху стишок, тот, который я пишу."

//* Тут в итоге получилось так: *//
//* Его коммент прям под стрелочкой лежит: *//
// **|******************************************** //
//*|*//
//*|*//
//*|*//
//*\|/*//

// Hiii!!
// How are u??

// btw, ТВОЙ КОД ПОЛНАЯ ХУЙНЯ
// p.s. пласти >:(
