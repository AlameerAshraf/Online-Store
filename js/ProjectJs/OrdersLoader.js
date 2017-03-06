var Data = document.getElementsByClassName("in-check") ; 
var ItemsNumbers = document.getElementsByClassName("cart-items") ;

var db = openDatabase("AsssS", '1.0', "My WebSQL Database", 8 * 1024 * 1024);
var select = function () {
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM ST23 WHERE Pieces != 0 ", [], function (tx, results) {
            if (results.rows.length > 0) {
                ItemsNumbers[0].innerHTML += " <h3>My Shopping Bag ("+ results.rows.length  +")</h3> "
                + "<div style='text-align: center ;'>	<a  onclick='myFunction()'  class = 'add-cart item_add' > Order Now ! </a>  </div> ";
                for( var i = 0 ; i< results.rows.length  ; i++){
                    Data[0].innerHTML += "<ul class='cart-header'>"+" <div class='close1'></div> "+" <li class='ring-in'>"
                    + "<a onmouseover='' style='cursor: pointer;'' onclick='Redirect(\""+ results.rows.item(i).Product_Name  +"\")' >"
                    +" <img  src='" + results.rows.item(i).image+ "' class='img-responsive' alt=''> " +  " </a>"
                    + " </li>"
                    + " <li><span class='name'>" + results.rows.item(i).Product_Name  + "</span></li> "
                    + " <li><span class='cost'>$ " + results.rows.item(i).price + "</span></li> " 
                    + " <li><span>"+ results.rows.item(i).Pieces +"</span> " 
                    + " <p> Total price for that product " + (results.rows.item(i).price * results.rows.item(i).Pieces).toFixed(2) + "</p></li> " 
                    + " <div class='clearfix'></div> " + " </ul> " ;
                }
            }
            else 
            {
                Data[0].innerHTML += "<div class='bar''  > <P> You aren't Order Any Thing yet , We Hope you're Happy shopping with us </P> </div> " ;
            }
        });
    });
}

function myFunction() 
{
    document.getElementsByClassName("ckeckout")[0].style.display = "none" ;
    console.log(document.getElementsByClassName("lastview")[0]) ;
    document.getElementsByClassName("lastview")[0].style.display = "block" ;
}
function LoadItems () 
{   
     select() ;
}
function Redirect (name) {
    window.location="single.html?ProductName="+""+ name +"";
}
function Empty () 
{
    document.getElementsByClassName("ckeckout")[0].style.display = "none" ;
    console.log(document.getElementsByClassName("lastview")[0]) ;
    document.getElementsByClassName("lastview")[0].style.display = "block" ;
}