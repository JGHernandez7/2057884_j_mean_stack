var Item = /** @class */ (function () {
    function Item(name, price) {
        this.name = name;
        this.price = price;
    }
    return Item;
}());
function storeCart(name, price) {
    var item = new Item(name, price);
    var cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    cart.push(item);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("size").innerHTML = "" + cart.length;
}
function showCart() {
    var aray = JSON.parse(sessionStorage.getItem("cart") || "[]");
    var totalPrice = 0;
    var tableContent = "";
    var startTable = "<table border = 1><tr><th>Item</th><th>Price</th></tr>";
    aray.forEach(function (element) {
        tableContent += "<tr><td>" + element.name + "</td><td>" + "$" + element.price + "</td></tr>";
        totalPrice += element.price;
    });
    var endTable = "</table><br>Total price: $" + totalPrice;
    tableContent = startTable + tableContent + endTable;
    document.getElementById("show").innerHTML = tableContent;
}
