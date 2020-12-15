// add new chat documents
// setting up a real-time listner to get new chats
// updating the username
// updating the room

class Chatroom{
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }

    async addChat(message){
        // format a chat object
        const now = new Date();
        const chat = {
            message,                        // ES6 shorhand for message: message
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }

        // save the chat document
        const response = await this.chats.add(chat);
        return response;
    }

    getChats(callback){                              // callback function is for the function we'll use to the UI
        this.unsub = this.chats                              
            .where('room', '==', this.room)           // complex query to get the changes of only the current room we're in
            .orderBy('created_at')                      
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach( change => {
                    if(change.type === 'added'){
                        callback(change.doc.data());
                    }
                })
            });
    }

    updateName(username){
        this.username = username;
        console.log('username updated 😁'); 
    }
    
    updateRoom(room){
        this.room = room;                           // but the listner is still listening on the previous/initial one if it's called before changing the room
        console.log('room updated 😉');
        if(this.unsub){                             // unsubscribes from changes from the previous room 
            this.unsub();
        }          
                                                    // IF WE WANT A NEW LISTNER FOR THE NEW ROOM, WE NEED TO CALL THE 'getChats()' METHOD
    }
    
}



const chatroom = new Chatroom('general', 'shaun');

chatroom.getChats(data => {
    console.log(data);
});

setTimeout(() => {
    chatroom.updateRoom('gaming');
    chatroom.updateName('ermias');
    chatroom.getChats(data => { 
        console.log(data);
    });
    chatroom.addChat('Hi, I\'m Ermias');
}, 3000);