const express = require('express');
const fetch = require('node-fetch');

document.addEventListener('DOMContentLoaded', () => {
    await handleCreateChat();
    await handleSendMessage();
});

/* HANDLER */

async function handleCreateChat() {
    const createChatBtn = document.getElementById('createChat');
    createChatBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const chatName = document.getElementById('chatName').value;
        const participants = document.getElementById('participants').value;
        await createChat(chatName, participants);
    });
}

async function handleSendMessage() {
    const sendMessageBtn = document.getElementById('sendMessage');
    sendMessageBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const message = document.querySelector('.messageInput').value;
        sendMessage(/*authorId,*/ message);
    });
}

/* FUNCTIONS */






async function createChat(chatName, participants) {
    try {
        // const response = await fetch(`http://localhost:83/chat`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${req.session.token}`
        //     },
        //     body: JSON.stringify({chatName, participants})
        // });

        const chatId ="1";
        
        const chat = `<li class='chat'><a href='/chat/${chatId}'>${chatName}</a></li>`;

        //append chat to list
        const chats = document.querySelector('.chats');
        const li = document.createElement('li');
        li.innerHTML = chat;
        chats.appendChild(li);
        window.scrollTo(0, document.body.scrollHeight);

    } catch {
        console.error("Fetch failed:", err);
        res.render('chats_tpl', {error_msg: `${err}`})
    }
}


async function getMessages(chatId) {
    try {
        const response = await fetch(`http://localhost:83/messages/${chatId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${req.session.token}`
            },
        }); 
        if (response.status == 401) {
            console.log("Authorization failed.")
            res.redirect('./chats')
        }
        else if (response.status == 404) {
            console.log("Chat not found.")
            res.redirect('./chats')
        }
        else {
            const data = await response.json();
            data.forEach(message => {
                addMessage(message);
            });
        }
    } catch {
        console.error("Fetch failed:", err);
        res.render('chats_tpl', {error_msg: `${err}`})
    }
    
}

function addMessage(message) {
    
}

async function getUsers() {
    try {
        const response = await fetch(`http://localhost:83/users/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${req.session.token}`
            },
        });
        //TODO: complete
    } catch {
        console.error("Fetch failed:", err);
        res.render('chats_tpl', {error_msg: `${err}`})
    }
}

async function sendMessage(message) {
    // const response = await fetch(`http://localhost:83/messages`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${req.session.token}`
    //     },
    //     body: JSON.stringify(message)
    // }); 
    // if (response.status == 401) {
    //     console.log("Authorization failed.")
    //     res.redirect('./chats')
    // }
    // else if (response.status == 404) {
    //     console.log("Chat not found.")
    //     res.redirect('./chats')
    // }
    // else {
    //     const data = await response.json();
    //     console.log(data);
    // }
    try {
        // fetch post message
        //res.status == 200?

        //also get author id
        const messages = document.querySelector('.messages');
        const li = document.createElement('li');
        li.innerHTML = message;
        messages.appendChild(li);
        window.scrollTo(0, document.body.scrollHeight);
    } catch (err) {
        console.error("Fetch failed:", err);
    }
}

 