let express = require("express");
let chatlog = express();
let http = require("http").Server(chatlog);
let io = require("socket.io")(http);
let bodyParser = require("body-parser");

chatlog.use(bodyParser.urlencoded({extended:true}));

let mongoose = require("mongoose");
let url = "mongodb://localhost:27017/meanStack";

let cSchema = mongoose.Schema({
    cID:Number,
    cName:String,
    cMessage:String
});

chatlog.get("/", (request,response)=> {
    response.sendFile(__dirname+"\\chat-log.html");
});

io.on("connection", (socket)=> {
    console.log("Socket connected");

    socket.on("obj", (obj1)=> {
        let prevID = 1;

        mongoose.pluralize(null);
        mongoose.connect(url).then(out=>console.log("You're Connected!")).catch(err=>console.log(err));

        let db = mongoose.connection;

        db.once("open", ()=> {
            let msgModel = mongoose.model("messages", cSchema);

            msgModel.find({}, (err, entry)=> {
                if (!err)
                {
                    entry.forEach(c=> {
                        prevID = c.cID + 1;
                    });
                }
                let data = new msgModel({cID:prevID, cName:obj1.userName, cMessage:obj1.info});

                msgModel.insertMany([data], (err, res)=> {
                    if (!err)
                    {
                        let today = new Date().toLocaleTimeString();
                        console.log("Message stored successfully!");
                        console.log(today + " | Name: '" + data.cName + "', Message: '" + data.cMessage + "'");
                    }

                    else
                    {
                        console.log(err);
                    }

                    mongoose.disconnect();
                });
            });
        });
    });
});

http.listen(9090, ()=>console.log("Server running on 9090"));