
//On connect contorller method for socket
function onConnect(socket) {
    const token = socket.handshake.query.token;
    console.log("connected successfully", socket.id);
    // console.log("connected successfully", socket);
    socket.on('disconnect',()=>{
        console.log("Disconnected", socket.id);
    })
  
    socket.on('message',(data)=>{
        console.log('message');
        socket.broadcast.emit('message-receive',data);
    })

    socket.on('upload-image',(data)=>{
        console.log('upload image');
        socket.broadcast.emit('receive-image',data['data']);
        console.log('upload image done');
        var time = parseInt(data['data']['deleteTime']) * 1000
        var index = data['index'];
        setTimeout(function (){
            socket.emit('delete-message',{index :index});
            socket.broadcast.emit('delete-message',{index :index});
            console.log("image delete command sent"); 
        },time);
    })

    socket.on('send-file',(data)=>{
        let fileData = data['data'];
        console.log('upload image');
        console.log(fileData['message'])
        console.log(fileData['file']) 

        var time = parseInt(data['data']['deleteTime']) * 1000; // seconds 
        
        var index = data['index'];
        socket.broadcast.emit('receive-file',{data :fileData});
        
        console.log("broadcast done");
        setTimeout(function (){
            socket.emit('delete-message',{index :index});
            socket.broadcast.emit('delete-message',{index :index});
            console.log("image delete command sent");
        },time);
        
    })
}

module.exports = {onConnect}