// add new chat documents
// setting up a real-time listner to get new chats
// updating the username
// updating the room

class Chatroom{
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
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
        this.chats                              
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
    
    
}


const chatroom = new Chatroom('general', 'shaun');

chatroom.getChats( data => {
    console.log(data);
});

