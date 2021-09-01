let express = require("express");
let app = express();
let http = require("http").Server(app);
let io = require('socket.io')(http);

app.get("/",(request,response)=> {
    response.sendFile(__dirname+"\\chatting-socket.html");
});

io.on("connection",(socket)=> {
    console.log("Connected!");

    socket.on("obj",(msg)=> {
        console.log(msg);
    });

    socket.emit("obj1");
});

http.listen(9090, ()=>console.log("Server running on 9090"));
