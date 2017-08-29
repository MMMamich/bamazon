var inquirer = require('inquirer');

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
    
  port: 3306,
    
  user: "root",

  password: "", //Your Password for MySQL Workbench
  database: "" //Your MySQL Database Name
});

connection.connect(function(err) {
  if (err) throw err;
  connection.query("SELECT id, product_name, price FROM products", function (err, result, fields) {
    if (err) throw err;
    console.log("WEELCOME, GOT SOME THINGS THINGS THAT MIGHT INTEREST YOU!");
    console.log("\n //==================================================================\\ \n");
    console.log(result);
    console.log("\n \\=================================================================//");
    questions();
  });
});
            
function questions() {
  inquirer.prompt([
      {
        name: "id",
        message: "Got some rare things on sale, stranger what wherya lookin at!",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      
      {
        name: "quantity",
        message: "What're ya buyin?  How many stranger?"  
//          "UPDATE products SET ? WHERE ?"
      }
  ]).then(function (answers) {
      
    var quantityInput = answers.quantity;
    var idInput = answers.id;
    purchase(idInput, quantityInput);  
      
//    var idGiven = answers.id;  //I have the ID of the product 
//      
//    var price = "SELECT * FROM products WHERE ?";
//      
//    if (answers.quantity <= quantitee){
//        connection.query("UPDATE products SET stock_quantity = '" + answers.quantity + "' WHERE id=5");
//        //Update MySQL
//        //fufill customers request 
//        //show total cost of their purchase
//        console.log("Your Total Price is: " + price. * answers.quantity);  //price * quantity
//    }else{
//        
//        //Insufficient Quantity
//        console.log("Not Enough Cash, Stranger!");
//    }
//    console.log("Resident Evil 4");
});
}

function purchase(id, quantityInput) {
 
    connection.query('SELECT * FROM products WHERE id = ' + id, function(error, response) {
        if (error) { console.log(error) };

        
        if (quantityInput <= response[0].stock_quantity) {
           
            var totalCost = response[0].price * quantityInput;
            
            console.log("\n We have what you need! I'll have your order right out!");
            console.log("Your total cost for " + quantityInput + " " + response[0].product_name + " is $" + totalCost + ". Hehehe Thaank You! \n");
            
            connection.query('UPDATE Products SET stock_quantity = stock_quantity - ' + quantityInput + ' WHERE id = ' + id);
            
            process.exit()
        } else {
            console.log("Don't Have Enough" + response[0].product_name + " Stranger! \n ");
            
            process.exit()
        };
        
    });

};


