let express = require("express");
let operation = express();
let bodyParser = require("body-parser");

operation.use(bodyParser.urlencoded({extended:true}));

let mongoose = require("mongoose");
let url = "mongodb://localhost:27017/meanStack";

mongoose.pluralize(null);
mongoose.connect(url).then(out=>console.log("You're Connected!")).catch(err=>console.log(err));

let cSchema = mongoose.Schema({
    cID:Number,
    cName:String,
    cInfo:String,
    cAmount:Number
});
let db = mongoose.connection;
let courseModel = mongoose.model("Course", cSchema);

operation.get("/", (request,out)=>{
    out.sendFile(__dirname+"/website-menu.html");
});

operation.get("/website-add", (request,out)=>{
    out.sendFile(__dirname+"/website-add.html");
});

operation.get("/website-delete",(request, out)=>{
    out.sendFile(__dirname+"/website-delete.html");
});

operation.get("/website-update",(request, out)=>{
    out.sendFile(__dirname+"/website-update.html");
});

operation.post("/add", (request, out)=>{
    
    let course = request.body;
    
    let cNew = new courseModel({cID:course.cID, cName:course.cName, cInfo:course.cInfo, cAmount:course.cAmount});
    courseModel.insertMany(cNew, (err,res)=>{
        if(!err)
        {
            console.log(res);
            console.log("Course ID '" + cNew.cID + "' successfully added!");
        }
        
        else
        {
            console.log(err);
        }
        
    });
    out.sendFile(__dirname+"/website-add.html");
})

operation.get("/delete", (request, out)=>{
    let id = request.query["cID"];

    courseModel.deleteOne({cID:id},(err, res)=> {
        if(!err)
        {
            if(res.deletedCount > 0)
            {
                console.log("Course ID '" + id + "' successfully deleted!");
            }
            
            else
            {
                console.log("Course ID '" + id + "' not found!");
            }
        }
        
        else
        {
            console.log(err);
        }
    });

})

operation.get("/update", (request, out)=>{
    let id = request.query["cID"];
    let newAmount = request.query["cAmount"];
    
    courseModel.updateOne({cID:id},{$set:{cAmount:newAmount}},(err,res)=>{
        if(!err)
        {
            if(res.matchedCount > 0 || res.modifiedCount > 0)
            {
                if(res.matchedCount == res.modifiedCount)
                {
                    console.log("Course ID '" + id + "' successfully updated!");
                }

                else
                {
                    console.log("Course ID '" + id + "' amount is the same as input!");
                }
            }

            else
            {
                console.log("Course ID '" + id + "' not found!");
            }
        }

        else
        {
            console.log(err);
        }
    })

    out.sendFile(__dirname+"/website-update.html");
})

operation.get("/website-list",(request, out)=>{
    let tableContent="";
    let startTable = "<table border = 1><tr><th>Course ID</th><th>Course Name</th><th>Descripton</th><th>Amount</th></tr>";
    let endTable = "</table>";
    courseModel.find({},(err, entry)=>{
        if(!err)
        {
            entry.forEach(c=> {
                tableContent += "<tr><td>" + c.cID + "</td><td>" + c.cName+ "</td><td>" + c.cInfo + "</td><td>" + c.cAmount + "</td></tr>";
            })

            out.write(startTable + tableContent + endTable);
        }
    })
});

operation.listen(9090, ()=>console.log("Server running on 9090"));