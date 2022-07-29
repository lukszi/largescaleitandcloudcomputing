/********* core modules *********/
const path = require('path');
/*********************************/

'use strict';

/****** third-party modules ******/
const express = require('express');
const app = express();
const session = require('express-session')
const consolidate = require('consolidate');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
/*********************************/

/******** custom modules *********/
const users = require('./routes/users.js');
const chats = require('./routes/chats.js');
/*********************************/


/****** built-in middleware ******/
app.use(express.static(__dirname + "/src/public"/*, {index: 'login.html'}*/));
/*********************************/


/**** third-party middleware ****/
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'some very secret secret',
    resave: false,
    saveUninitialized: true,
    cookies: {maxAge: 60000}
}));
app.engine('html', consolidate.mustache);

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
/********************************/


/****** custom middleware ******/
app.get('/', (req, res) => {
    res.redirect('/users/login')
})
app.use('/users', users);
app.use('/', chats);
/*******************************/


/****** socket ******/
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


/****** consts ******/
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
/********************/


// server.listen(3000, () => {
//     console.log("Server started on port 3000");
// });

/******************/


app.listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`);
});