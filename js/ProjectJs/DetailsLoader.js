function GetTheProductName() {
    var Url = window.location.search.substring(1);
    var ArrayOfParamters = Url.split('&');
    var ArrayOfParamtersLen = ArrayOfParamters.length;
    for (var i = 0; i < ArrayOfParamtersLen; i++) {
        var CurrentPar = ArrayOfParamters[i].split('=');
        if (CurrentPar[0] == "ProductName") {
            return CurrentPar[1];
        }
    }
}

var NameOfProduct = GetTheProductName();
var HNameOfProduct = NameOfProduct.replace("%20", " ");


var db = openDatabase("AsssS", '1.0', "My WebSQL Database", 8 * 1024 * 1024);
var Im = document.getElementsByClassName("thumb-image");
var Det = document.getElementsByClassName("col-md-7 single-top-right");

var select = function (Product_Name) {
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM ST23 WHERE Product_Name = ? ", [Product_Name], function (tx, results) {
            if (results.rows.length > 0) {
                Im[0].innerHTML += "<img src = '" + results.rows.item(0).image + "' data-imagezoom = 'true' class = 'img-responsive' alt=''  />";
                Det[0].innerHTML += "<div class = 'col-md-7 single-top-right'>\
                <div class ='single-para simpleCart_shelfItem'>" + "<h2>" + results.rows.item(0).Product_Name + "</h2>"
                    + " <div class = 'star-on'> <div class='clearfix'>" + "</div> </div>"
                    + "<h5 id='p"+ results.rows.item(0).Product_Name +"' class = 'item_price'>" + results.rows.item(0).price + "$" + "</h5>"
                    + "<p>" + results.rows.item(0).description + "<div class = 'available'>"
                    + " <ul> " + " <li> <p style='color : red ;' > Avilable Color <p> " + " </li> "
                    + " <div class = 'clearfix'> </div> " + " </ul> " + " </div> "
                    + " <a  onclick='AddItemToCart(\""+results.rows.item(0).Product_Name+"\")' class = 'add-cart item_add' > Add To Cart </a> " + "</div> </div>";
            }
        });
    });
}
var CartContains = sessionStorage.getItem('Cart') ;
function LoadProductDetails() {
     document.getElementById("Cart").innerText = CartContains ;
    select(HNameOfProduct);
}    

function  AddItemToCart (name) 
{
    document.getElementById("Cart").innerText = (parseFloat(document.getElementById('p'+name).innerHTML) + parseFloat (document.getElementById("Cart").innerText)).toFixed(2) ;
}


