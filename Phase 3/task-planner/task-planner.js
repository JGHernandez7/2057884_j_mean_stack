let http = require("http");
let fs = require("fs");
let url = require("url");

let list = JSON.parse(fs.readFileSync("task-planner.json").toString());

let form = `
<h1><center>Task Planner</center></h1>

<h3><u>Add Task</u></h3>
<form action='storeTask'>
    Employee Id:<input type="text" name="empId" /><br>
    Task Id:<input type="text" name="taskId" /><br>
    Task:<input type="text" name="task" /><br>
    Deadline:<input type="date" name="deadline" /><br>
    <input type="submit" value="Add Task">
</form><hr>

<h3><u>Delete Task</u></h3>
<form action = 'removeTask'>
    Task Id:<input type="text" name="removeId" /><br>
    <input type="submit" value="Delete Task" />
</form><hr>

<h3><u>List Task(s)</u></h3>
<form action="displayTask">
    <input type="submit" value="List Tasks" />
</form>
`

let server = http.createServer((request, response) => {
    let urlInfo = url.parse(request.url,true);
    response.writeHead(200, { "content-type": "text/html" });
    response.write(form);

    if(urlInfo.pathname == "/storeTask")
    {
        let newEntry = urlInfo.query;
        let ref = 0;

        for(let i = 0; i < list.length; i++)
        {
            if(list[i].taskId == newEntry.taskId)
            {
                ref++;
            }
        }

        if(0 < ref)
        {
            console.log("Task ID '" + newEntry.taskId + "' in use!");
        }
        
        else
        {
            list.push(newEntry);
            fs.writeFileSync("task-planner.json", JSON.stringify(list));
            console.log("Task ID '"+ newEntry.taskId +"' stored!");
        }
    }

    else if(urlInfo.pathname == "/removeTask")
    {
        let newEntry = urlInfo.query;
        let ref = -1;

        for(let i = 0; i < list.length; i++)
        {
            if(list[i].taskId == newEntry.removeId)
            {
                ref = i;
            }
        }
        
        if(ref == -1)
        {
            console.log("Task ID '" + newEntry.removeId + "' not found!");
        }
        
        else
        {
            list.splice(ref,1);
            fs.writeFileSync("task-planner.json", JSON.stringify(list));
            console.log("Task ID '"+ newEntry.removeId +"' removed!");
        }
    }

    if(urlInfo.pathname == "/storeTask" || urlInfo.pathname == "/removeTask" || urlInfo.pathname == "/displayTask")
    {
        let tableStart = "<table border=1><tr><th>Employee ID</th><th>Task ID</th><th>Task Name</th><th>Deadline</th></tr>";
        let tableData = "";
        let tableEnd = "</table>";

        for (let i = 0; i < list.length; i++)
        {
            tableData += "<tr><td>"+list[i].empId+"</td><td>"+list[i].taskId+"</td><td>"+list[i].task+"</td><td>"+list[i].deadline+"</td></tr>";
        }
        
        response.write(tableStart + tableData + tableEnd);
    }
    
    response.end();
});

server.listen(9090, () => console.log("server running on 9090"));