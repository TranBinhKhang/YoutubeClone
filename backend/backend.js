const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cors = require('cors');

const port = process.env.PORT || 3000;
app.listen(port);
app.use(express.json());
app.use(cors());

console.log('connected');

const users = [
      {
        "username": "America",
        "password": "123456"
      },
      {
        "username": "France",
        "password": "123456"
      },
      {
        "username": "Khang",
        "password": "123456"
      }
];

app.get("/test", async (req, res) => {
    try {
    res.send('It works');
    }
    catch {
        res.send('It doesnt wok')
    }
  });

app.post('/api/login', async (req, res) => {
        const user = JSON.stringify(req.body);
        const allUsers = JSON.stringify(users);       
        if (allUsers.includes(user)) res.send(jwt.sign(user, 'secret'));
        else res.send(null)
    });

    app.post('/api/info', async (req, res) => {
        try {
        const token = req.body.token;
        // res.send(token);
        const decoded = jwt.verify(token, 'secret');
        res.send(decoded);
        }
        catch {
            res.send('error');
        }
    });