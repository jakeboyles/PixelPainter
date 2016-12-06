const express = require('express');
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const cons = require('consolidate');
const logger = require('morgan');
const request = require('request');
const path = require('path');
const server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('views', __dirname + '/views');
app.engine('html', cons.mustache);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'app')))

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {
    res.render('index.html')
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
    console.log('Server running on port ' + port + '!');
})

let colors = [];

const id = 123;

io.on('connection', socket => {

    socket.on('vote', data => {
        colors.push({ color: data.color })
        io.emit(id, { data: colors });
    });

    socket.on('getColors', data => {
        io.emit(id, { data: colors });
    });

    socket.on('clear', data => {
        colors = [];
        io.emit(id, { data: colors });
    });

});
