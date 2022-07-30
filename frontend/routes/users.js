const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Database = require("../src/public/js/database.js");
const bcrypt = require('bcryptjs');
const fetch = require('node-fetch');




router.get("/login", (req, res) => {
    if(req.session.user)
        res.redirect("../chats");
    else
        res.render('login_tpl')
})

router.post('/login', [check('user').escape()], async ( req, res ) => {
    const Username = req.body.user;
    const Password = req.body.pw;


    if (!Username || !Password) {
        res.render('login_tpl', {error_msg: "Username or password missing!"})
    }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render('login_tpl', {error_msg: errors.array()[0].msg})
    }

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate( (err) => { 
        if (err) console.log(err)
    });

    try {
        const db = await Database.getInstance();
        await db.validateUser(user, password);
        req.session.user = Username;
        req.session.save( (err) => {
            if (err) console.log(err)
            res.redirect('../chats')
        });

        // const response = await fetch(`http://localhost:80/authenticate`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({Username, Password})
        // });
        // const data = await response.text();
        // if (data == "Credentials not accepted") {
        //     res.render('login_tpl', {error_msg: "Username or password incorrect!"})
        // } else {
        //     const token = data;
        //     req.session.user = Username;
        //     req.session.token = token;
        //     req.session.save( (err) => {
        //         if (err) console.log(err)
        //         res.redirect('../chats')
        //     });
        // }
    } catch (err) {
        console.error("Login failed:", err);
        res.render('login_tpl', {error_msg: `${err}`})
    }


});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('../')
});

router.get('/register', (req, res) => {
    res.render('register_tpl');
});

router.post("/register", [check('user').escape()], async (req, res) => { 
    /*escaping the user prevents xss-attacks*/
    const name = req.body.user
    const passwd = req.body.pw

    if (!name || !passwd) {
        res.render('register_tpl', {error_msg: "Username or password missing!"})
    }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render('register_tpl', {error_msg: errors.array()[0].msg})
    }

    const salting_rounds = 10
    const password = await bcrypt.hash(passwd, salting_rounds);
    try {
        // backend wird ja nichts mehr....
        const db = await Database.getInstance();
        await db.registerUser(name, password)

        // const response = await fetch("http://localhost:80/users", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({name, password})
        // })
        // const data = await response.text()
        // console.log(`data: ${data}`)
        // if(data == "User already exists")
        //     res.render('register_tpl', {error_msg: `User already exists`})
        // else {
        //     const json = JSON.parse(data)
        //     if(!json.userName || !json.userId)
        //         res.render('register_tpl', {error_msg: `An unknown error occurred`})
        //     else {
        //         res.render('register_tpl', {error_msg: `User '${name}' successfully registered! You may login now.`})
        //     }
        // }
    } catch (err) {
        console.error(err)
        res.render('register_tpl', {error_msg: `${err}`})
    }
});

module.exports = router;