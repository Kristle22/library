const express = require('express');
const app = express();
const port = 3003;

const cors = require("cors");
app.use(cors());
app.use(express.json({ limit: '10mb' }));
const mysql = require("mysql");

const md5 = require('js-md5');
const uuid = require('uuid');
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "library",
});

// ///////////////DO AUTH////////////
const doAuth = function (req, res, next) {
  if (0 === req.url.indexOf('/admin')) {
    // admin
    const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
    con.query(
      sql, [req.headers['authorization'] || ''],
      (err, results) => {
        if (err) throw err;
        if (!results.length || results[0].role !== 'admin') {
          res.status(401).send({});
          req.connection.destroy();
        } else {
          next();
        }
      }
    );
  } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login')) {
    next();
  } else {
    // Front
    const sql = `
    SELECT
    name, role
    FROM users
    WHERE session = ?
`;
    con.query(
      sql, [req.headers['authorization'] || ''],
      (err, results) => {
        if (err) throw err;
        if (!results.length) {
          res.status(401).send({});
          req.connection.destroy();
        } else {
          next();
        }
      }
    );
  }
}
app.use(doAuth)

//Auth
app.get("/login-check", (req, res) => {
  let sql;
  let requests;
  if (req.query.role === 'admin') {
    sql = `
      SELECT
      name
      FROM users
      WHERE session = ? AND role = ?
      `;
    requests = [req.headers['authorization'] || '', req.query.role];
  } else {
    sql = `
      SELECT
      name
      FROM users
      WHERE session = ?
      `;
    requests = [req.headers['authorization'] || ''];
  }
  con.query(sql, requests, (err, result) => {
    if (err) throw err;
    if (!result.length) {
      res.send({ msg: 'error' });
    } else {
      res.send({ msg: 'ok' });
    }
  });
});

app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
  UPDATE users
  SET session = ?
  WHERE name = ? AND pass = ?
`;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: 'error', key: '' });
    } else {
      res.send({ msg: 'ok', key });
    }
  });
});

app.post("/register", (req, res) => {
  const key = uuid.v4();
  const sql = `
  INSERT INTO users
  (name, email, pass, session)
  VALUES (?, ?, ?, ?)
`;
  con.query(sql, [req.body.user, req.body.email, md5(req.body.pass), key], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: 'error', key: '' });
    } else {
      res.send({ msg: 'ok', key });
    }
  });
});

// ////////////REQUESTS TO DB////////////////
// READ & queries FRONT&BACK
app.get('/knygos', (req, res) => {
  let sql;
  let requests;
  if (!req.query['cat-id'] && !req.query['s']) {
    sql = `
    SELECT
    b.id, b.title, author, published, pages, ISBN, photo, cat_id, c.title AS cat, rates, rate_sum, GROUP_CONCAT(cm.id) AS coms_id, GROUP_CONCAT(time, '#', com, '-^-^-') AS coms, COUNT(com) AS com_count 
    FROM books AS b 

    LEFT JOIN comments AS cm
    ON b.id = cm.book_id

    LEFT JOIN categories AS c
    ON b.cat_id = c.id
    GROUP BY b.id
    `;
    requests = [];
  } else if (req.query['cat-id']) {
    sql = `
    SELECT
    b.id, b.title, author, published, pages, ISBN, photo, cat_id, c.title AS cat, rates, rate_sum, GROUP_CONCAT(cm.id) AS coms_id, 
    GROUP_CONCAT(time, '#', com, '-^-^-') AS coms, COUNT(com) AS com_count 
    FROM books AS b 

    LEFT JOIN comments AS cm
    ON b.id = cm.book_id

    LEFT JOIN categories AS c
    ON b.cat_id = c.id
    WHERE c.id = ?
    GROUP BY b.id
  `;
    requests = [req.query['cat-id']];
  } else {
    sql = `
    SELECT
    b.id, b.title, author, published, pages, ISBN, photo, cat_id, c.title AS cat,
    rates, rate_sum, 
    GROUP_CONCAT(cm.id) AS coms_id, 
    GROUP_CONCAT(time, '#', com, '-^-^-') AS coms, COUNT(com) AS com_count 
    FROM books AS b 

    LEFT JOIN comments AS cm
    ON b.id = cm.book_id

    LEFT JOIN categories AS c
    ON b.cat_id = c.id
    WHERE b.title LIKE ?
    GROUP BY b.id
    `;
    requests = ['%' + req.query['s'] + '%'];
  }
  con.query(sql, requests, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Simple READ
app.get('/kategorijos', (req, res) => {
  const sql = `
  SELECT
  c.id, c.title, b.cat_id AS catId 
  FROM categories AS c
  LEFT JOIN books AS b
  ON c.id = b.cat_id
  GROUP BY c.title
  ORDER BY c.title
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// CREATE BACK
app.post('/knygos', (req, res) => {
  const sql = `
  INSERT INTO books
  (title, author, published, pages, ISBN, photo, cat_id)
  VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  con.query(sql, [req.body.title, req.body.author, req.body.published, req.body.pages, req.body.isbn, req.body.photo, req.body.cat], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Nauja knyga sekmingai itraukta', type: 'success' } });
  })
});
// CREATE CAT BACK
app.post('/kategorijos', (req, res) => {
  const sql = `
  INSERT INTO categories
  (title)
  VALUES (?)
  `;
  con.query(sql, [req.body.title], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Nauja kategorija sekmingai itraukta', type: 'success' } });
  })
});

// EDIT BACK
app.put('/knygos/:id', (req, res) => {
  const sql = `
  UPDATE books 
  SET title = ?, author = ?, published = ?, pages = ?, ISBN = ?, photo = ?, cat_id = ?
  WHERE id = ?
  `;
  con.query(sql, [req.body.title, req.body.author, req.body.published, req.body.pages, req.body.isbn, req.body.photo, req.body.cat, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Informacija apie knyga sekmingai atnaujinta', type: 'info' } });
  });
});

// DELETE BACK
app.delete('/knygos/:id', (req, res) => {
  const sql = `
  DELETE FROM books
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Knyga istrinta is saraso', type: 'danger' } });
  })
});

// DELETE CAT BACK
app.delete('/kategorijos/:id', (req, res) => {
  const sql = `
  DELETE FROM categories
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Katrgorija istrinta is saraso', type: 'danger' } });
  })
});

// ////////////////////COMMENTS/////////////////////
// CREATE Comments FRONT
app.post('/komentarai', (req, res) => {
  const sql = `
  INSERT INTO comments
  (com, book_id)
  VALUES (?, ?)
  `;
  con.query(sql, [req.body.com, req.body.bookId], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Jusu komentaras issiustas!', type: 'success' } });
  })
});

// READ Comments FRONT
app.get('/komentarai', (req, res) => {
  const sql = `
    SELECT
   GROUP_CONCAT(cm.id) AS coms_id, GROUP_CONCAT(time, '#', com, '-^-^-') AS coms, COUNT(com) AS com_count, book_id, b.title, b.author, b.photo
    FROM comments AS cm
    LEFT JOIN books AS b
    ON cm.book_id = b.id
    GROUP BY b.id
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// // DELETE comments BACK
// app.delete('/komentarai/:id', (req, res) => {
//   const sql = `
//   DELETE FROM comments
//   WHERE id = ?
//   `;
// con.query(sql, [req.params.id], (err, result) => {
//   if (err) throw err;
//   res.send({ result, msg: { text: 'Komentaras istrintas is saraso', type: 'danger' } });
// });

// CREATE ORDER FRONT
app.post('/uzsakymai', (req, res) => {
  const sql = `
  INSERT INTO orders
  (book_id, user_id)
  VALUES (?, ?)
  `;
  con.query(sql, [req.body.bookId, req.body.userId], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Jusu uzsakymas pateiktas sekmingai. Laukite rezervacijos patvirtinimo!', type: 'success' } });
  })
});

// READ ORDERS FRONT
app.get('/uzsakymai', (req, res) => {
  const sql = `
    SELECT
   o.id, order_date, return_date, book_id, user_id, status, title, author, ISBN, photo  
    FROM orders AS o
    LEFT JOIN books AS b
    ON o.book_id = b.id
    GROUP BY o.id
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// READ USERS
app.get('/users', (req, res) => {
  const sql = `
    SELECT
  id, name, email, role
    FROM users
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

///////DELETE/UPDATE/STATUS/RATING////////////
// EDIT STATUS BACK
app.put('/statusas/:id', (req, res) => {
  // const sql = `
  // UPDATE orders 
  // SET status = 1
  // WHERE id = ?
  // `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Uzsakymas patvirtintas', type: 'info' } });
  });
});

// EDIT reitings FRONT
app.put('/reitingai/:id', (req, res) => {
  const sql = `
  UPDATE books 
  SET rates = rates + 1, rate_sum = rate_sum + ?
      where id = ?
        `;
  con.query(sql, [req.body.rate, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Jusu balsas sekmingai iskaitytas. Aciu uz ivertinima!', type: 'info' } });
  });
});


app.listen(port, () => {
  console.log(`Peleda klauso porto ${port}`)
})