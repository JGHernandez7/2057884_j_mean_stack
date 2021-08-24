let fs = require("fs");
let rl = require("readline-sync");

let buffer;
let input;
let records;
let entryResult;

do{
    debugger;
    try
    {
        input = fs.readFileSync("log-records.json");
        records = JSON.parse(input);
        records.push(newEntry());
        entryResult = JSON.stringify(records);
    }
    
    catch (err) 
    {
        fs.writeFileSync("log-records.json","");
        records = [newEntry()];
        entryResult = JSON.stringify(records);
    }

    debugger;

    fs.writeFileSync("log-records.json",entryResult);
    console.log("Entry stored!");
    buffer = rl.question("Enter 'x' to quit application or press 'enter' to add another log entry: ");

    debugger;

    function newEntry()
    {
        let firstName = rl.question("Enter your first name: ");
        let lastName = rl.question("Enter your last name: ");
        let gender = rl.question("Enter your gender: ");
        let email = rl.questionEMail("Enter your email: ");
        
        let today = new Date();
        let date = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        
        debugger;

        let entry = {
                        firstName:firstName,
                        lastName:lastName,
                        gender:gender,
                        email:email,
                        date:date,
                        time:time
                    }

        return entry;
    }
    debugger;
}while(buffer != "x");
