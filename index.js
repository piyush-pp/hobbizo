require('dotenv').config();
require('./connection')
const express = require('express');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
  cors: {
    origin:"*"
  }
});

app.get('/', (req, res) => res.send('Welcome to Express'));

const socket = require('./routers/app/socket');
app.use(socket(io));

var path = require('path')
app.use('/files/'+"images", express.static(path.join(__dirname, 'images')));

server.listen(port, () => {
  console.log('Running Hobbizo on Port ' + port);
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

const users = require('./routers/app/users');
const mobile = require('./routers/app/mobile');
const hobbies = require('./routers/app/hobbies');
const favourite = require('./routers/app/favourite');
const media = require('./routers/app/media');
const chat = require('./routers/app/chat');

app.use(process.env['API_V1'] + "user", users);
app.use(process.env['API_V1'] + "mobile", mobile);
app.use(process.env['API_V1'] + "hobbies", hobbies);
app.use(process.env['API_V1'] + "favourite", favourite);
app.use(process.env['API_V1'] + "media", media);
app.use(process.env['API_V1'] + "chat", chat);


