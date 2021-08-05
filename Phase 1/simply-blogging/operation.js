function addBlog(){
    var title = document.getElementById("title").value;
    var article = document.getElementById("articles").value;
    var imageURL = document.getElementById("image").value;

    if (title == "")
        title = "Sample Title";

    if (article == "")
        article = "Hopes and dreams were dashed that day. It should have been expected, but it still came as a shock. The warning signs had been ignored in favor of the possibility, however remote, that it could actually happen. That possibility had grown from hope to an undeniable belief it must be destiny. That was until it wasn't and the hopes and dreams came crashing down.";
    
    if (imageURL == "")
        imageURL = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/fuji-and-sakura-royalty-free-image-144483163-1562593125.jpg?crop=0.668xw:1.00xh;0,0&resize=480:*";
        
    var myPost = "<div class='container bg-light'><h3>" + title + "</h3>" + 
                 "<br>" + article + "<br><br>" + 
                 "<img src = \"" + imageURL+"\"></div>";
    
    document.getElementById("blog").innerHTML += myPost;
    document.getElementById("postForm").reset();
}