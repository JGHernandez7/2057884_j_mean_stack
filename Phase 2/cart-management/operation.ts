class Item
{
    public name:string;
    public price:number;

    constructor(name:string, price:number)
    {
        this.name = name;
        this.price = price;
    }
}

function storeCart(name:string, price:number)
{
    let item = new Item(name, price);
    let cart:Array<Item> = JSON.parse(sessionStorage.getItem("cart") || "[]");
    
    cart.push(item);
    
    sessionStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("size").innerHTML = "" + cart.length;
}

function showCart()
{
    let aray = JSON.parse(sessionStorage.getItem("cart") || "[]");
    var totalPrice:number = 0;
    var tableContent= "";
    var startTable = "<table border = 1><tr><th>Item</th><th>Price</th></tr>";

    aray.forEach(element=>{
        tableContent += "<tr><td>" + element.name + "</td><td>" + "$" + element.price + "</td></tr>";
        totalPrice += element.price;
    })

    var endTable= "</table><br>Total price: $" + totalPrice;
    tableContent = startTable + tableContent + endTable;
    document.getElementById("show").innerHTML = tableContent;
}