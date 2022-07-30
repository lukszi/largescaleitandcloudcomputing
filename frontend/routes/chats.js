const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');


router.get('/chats', async (req, res) => {
    if (req.session.user) {
        try {
            // const response = await fetch(`http://localhost:83/chat/`, {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${req.session.token}`
            //     }
            // })
            // if (response.status == 401) {
            //     console.log("Authorization failed.")
            //     res.redirect('./chats')
            // } else {
            //     const chatIds = await response.json();
                
            //     chatIds.forEach(element => {
            //         // document.
            //     });
            // }
    
            res.render('chats_tpl', {session_info: `Logged in as: ${req.session.usser}`})

    
        } catch (err) {
            console.error("Failed to receive chats:", err);
            res.render('chats_tpl', {error_msg: `${err}`})
        }
        
    }
    else
        res.redirect('./users/login')        
});

router.get('/chats/:id', async (req, res) => {
    $id = parseInt(req.params.id);
    try {
        // const response = await fetch(`http://localhost:83/chat/${id}`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `BEARER ${req.session.token}`
        //     }
        // })
        // if (response.status == 401) {
        //     console.log("Authorization failed.")
        //     res.redirect('./chats')
        // } else if (response.status == 404) {
        //     console.log("Chat not found.")
        //     res.redirect('./chats')
        // } else {
        //     const data = await response.json();
        //     // const id = data.chatId;
        //     // const name = data.chatName;
        //     // const userIds = data.users;
        //     //get messages from chat with id
        //     //display messages, title, users
        // }
        res.render('chat_tpl')
        //chat_tpl hat keine styles weil geht ja schlecht ohne db und funktionierende rest endpunkte und so
    } catch (err) {
        console.error("Fetch failed:", err);
    }


    res.render('chat_tpl.html', {message_data: "pewpew"})
});

router.post('/chats', async (req, res) => {
    const users = req.body.users;


    //create a new chat
    //add selected users to chat
});

// router.post('/chats/messages', (req, res) => {
//     var message = new Message(req.body);
//     message.save((err) =>{
//         if(err)
//         sendStatus(500);
//         io.emit('message', req.body);
//         res.sendStatus(200);
//     });
// });


module.exports = router;

