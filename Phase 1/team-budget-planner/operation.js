function storeData() {
    client = document.getElementById("clientName").value;
    project = document.getElementById("projectName").value;
    budget = document.getElementById("budgetAmount").value;
    let row = JSON.parse(sessionStorage.getItem("row") || "[]");
    let entry = {c: client, p: project, b: budget};
    row.push(entry);

    sessionStorage.setItem("row", JSON.stringify(row));
    document.getElementById('clientName').value = '';
    document.getElementById('projectName').value = '';
    document.getElementById('budgetAmount').value = '';
    window.alert("Entry saved!");
}

function showData(){
    let row = JSON.parse(sessionStorage.getItem("row") || "[]");
    var totalBudget = 0;
    var tableContent = "";
    var startTable ="<table border=1><tr><th>Client Name</th><th>Project Name</th><th>Budget</th></tr>"
    
    row.forEach(element=>{
        tableContent += "<tr><td>"+element.c+"</td><td>"+element.p+"</td><td>"+"$"+element.b+"</td></tr>"
        totalBudget += +element.b;
    })

    var endTable="</table></br>Total Budget: $"+totalBudget;
    tableContent = startTable+tableContent+endTable;
    document.getElementById("display").innerHTML=tableContent;
}
