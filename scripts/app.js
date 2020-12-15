// DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-msg');
const rooms = document.querySelector('.chat-rooms');


// add a new chat
newChatForm.addEventListener('submit', e =>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)   // ok to use before the instantiating code as chatroom below
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));     
});

// update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    
    // show and hide
    updateMessage.innerText = `Your name is updated to ${newName}`;
    setTimeout(() => updateMessage.innerText = '', 3000);

    newNameForm.reset();
});

// update the chat room
rooms.addEventListener('click', e => {
    if(e.target.tagName === "BUTTON"){
        chatUI.clear(); 
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(data => chatUI.render(data));
    }
});

// check local storage for a name
const username = localStorage.username ? localStorage.username : 'Anonymous';

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);


// get the chats and render
chatroom.getChats(data => chatUI.render(data));
 