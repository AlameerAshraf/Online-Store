var db = openDatabase("AsssS", '1.0', "My WebSQL Database", 8 * 1024 * 1024);

var create = function() {
    db.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS ST23 (id integer primary key, Product_Name text, description text , image text , price integer , Pieces integer)");
    });
}

 
var insert = function(Product_Name, description , image , price , Pieces ) {
    db.transaction(function (tx) {
        tx.executeSql("INSERT INTO ST23 (Product_Name, description ,image , price , Pieces ) VALUES (?,?,?,?,?)", [Product_Name , description ,image ,price ,Pieces ]);
   });
}

var update = function (Pieces ,Product_Name) {
    db.transaction (function (tx) {
        tx.executeSql("UPDATE ST23 SET Pieces = ? WHERE Product_Name = ? ;" , [ Pieces, Product_Name] ) ; 
    })
}

var select = function(Product_Name) {
    db.transaction(function (tx) {
        tx.executeSql("SELECT price FROM ST23 WHERE Product_Name = ? " , [Product_Name], function(tx, results) {
            if(results.rows.length > 0) {
                  var s =  results.rows.item(0).price ; 
            }
        });
    });
}


var Drop = function ()
{
    db.transaction (function (tx) {
        tx.executeSql ("DROP TABLE ST23" ,[]) ; 
    })
}

function ProductGetter () 
{
    Drop() ;
    create () ;
    var Products = new XMLHttpRequest () ; 
    Products.open("POST","http://188.166.81.130/staging/public/stores.json",true); 
    Products.onreadystatechange = function () 
    {
        if (this.readyState == 4 && this.status == 200)
        {
            document.getElementById("loader").style.display = "none";
            var LineSeprator = 0 ;
            var NoPieces = 0 ;
            var product_one = document.getElementsByClassName("product-one");
            var ListOfProducts = JSON.parse(this.response) ;
            var LoopIterations = ListOfProducts.length ;
            for (var i = 0; i < LoopIterations; i++)
             {
                insert (ListOfProducts[i].StoreName , ListOfProducts[i].StoreDescription , ListOfProducts[i].StoreLogo , ListOfProducts[i].StoreName, NoPieces);
                if (LineSeprator % 4 == 0  ) {
                    
                    product_one[0].innerHTML += "<div class='clearfix'></div>";
                    product_one[0].innerHTML += "<br>" + "<br>";
                }
                product_one[0].innerHTML += " <div class='col-md-3 product-left'> \
                      <div class='product-main simpleCart_shelfItem'>" + "<a onclick='Redirect(\""+ ListOfProducts[i].StoreName +"\")' class='mask'>\
                      <img class='img-responsive zoom-img'' src= "+ ListOfProducts[i].StoreLogo + "  alt="+ListOfProducts[i].StoreName+"/>\
                      </a>"+ "<div class='product-bottom'>" + "<h3>"+ ListOfProducts[i].StoreName +"</h3>" + "<p> "+ ListOfProducts[i].StoreDescription +" </p>\
                      "+"<h4><a class='item_add' href='#'><i></i></a> <span id='p"+ListOfProducts[i].StoreName+"'>"+ ListOfProducts[i].StoreName +"</span\
                      class ='item_price'><span>$</span>\
                      </h4>"+"<p style ='color : "+ListOfProducts[i].color+"'> Avialable Color </p>\
                      "+"<input id ='MYOWNBTN' onclick='AddToCart(\""+ListOfProducts[i].StoreName+"\")' type='button'' value='A'>\
                      "+"<input disabled style = ' text-align: center '  id ='"+ListOfProducts[i].StoreName+"' type='text' value='0'>\
                      "+"<input id ='MYOWNBTN1' onclick='RemoveFromCart(\""+ListOfProducts[i].StoreName+"\")' type='button' value='R'>"+ "</div>"+"</div> </div> ";
                      LineSeprator++ ;      
            }  
        }
    }
    Products.send() ;
}

//================================================================================== 

function AddToCart(name) {
    var Quantity = parseInt(document.getElementById(name).value);
    Quantity++;
    document.getElementById(name).value = Quantity;

    update (Quantity,name) ; 
    document.getElementById("Cart").innerText = (parseFloat(document.getElementById('p'+name).innerHTML) + parseFloat (document.getElementById("Cart").innerText)).toFixed(2) ;
    sessionStorage.setItem('Cart' , document.getElementById("Cart").innerText) ; 
}


function RemoveFromCart(name) {

    if (document.getElementById(name).value == 0) {

        document.getElementById(name).value = 0;
    }
    else {
        var Quantity = parseInt(document.getElementById(name).value);
        Quantity--;
        document.getElementById(name).value = Quantity;

        update (Quantity,name) ;
        document.getElementById("Cart").innerText = (parseFloat (document.getElementById("Cart").innerText) - parseFloat(document.getElementById('p'+name).innerHTML)).toFixed(2);
        sessionStorage.setItem('Cart' , document.getElementById("Cart").innerText) ;
    }
}


function Redirect (name) {
    window.location="single.html?ProductName="+""+ name +"";
}

function Buy () 
{
      window.location="checkout.html" ;
}











































/*
<div class="container">
<div class="product-top">
<div class="product-one">
<div class="col-md-3 product-left">
<div class="product-main simpleCart_shelfItem">
<a href="single.html" class="mask"><img class="img-responsive zoom-img" src="images/p-1.png" alt="" /></a>
<div class="product-bottom">
								<h3>Smart Watches</h3>
								<p>Explore Now</p>
								<h4><a class="item_add" href="#"><i></i></a> <span class=" item_price">$ 329</span></h4>
							</div>
							<div class="srch">
								<span>-50%</span>
							</div>
*/

// function lod() {
//     var thing = { img1: "images/1.jpg", img2: "images/2.jpg", img3: "images/2.jpg", img4: "images/2.jpg", img4: "images/2.jpg", img5: "images/2.jpg", img6: "images/2.jpg" };
//     var s = document.getElementsByClassName("product-one");

    
//     var c = 0;

//     for (key in thing) {
//         if (c == 4) {
//             console.log("a7a");
//             s[0].innerHTML += "<div class='clearfix'></div>";
//             s[0].innerHTML += "<br>" + "<br>";
//         }
//         s[0].innerHTML += " <div class='col-md-3 product-left'> \
//     <div class='product-main simpleCart_shelfItem'>" + "<a href='single.html' class='mask'>\
//     <img class='img-responsive zoom-img'' src= "+ thing[key] + "  alt=''/>\
//     </a>"+ "<div class='product-bottom'>" + "<h3>Smart Watches</h3>" + "<p>Explore Now</p>\
//     "+ "<h4><a class='item_add' href='#'><i></i></a> <span class='item_price'>$ 329</span></h4>\
//     " + "<div class='srch'>" + "<span>+</span>" + "</div>" + "</div>" + " </div> </div> ";
//         c++;
//     }


// }
