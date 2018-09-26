var csv = require("fast-csv");
var fs = require('fs');
var inputFile = 'split_ab_with_query.csv';
var outputFile = `${inputFile}-output`;
var csvStream = csv.createWriteStream({headers: true}),
writableStream = fs.createWriteStream("split_ab_with_query.csv");

const fs = require('fs');

fs.readdirSync(testFolder).forEach(file => {
  console.log(file);
})
writableStream.on("finish", function(){
    console.log("DONE!");
  });
   
  csvStream.pipe(writableStream);

csv
 .fromPath("split_ab.csv", {headers: true})
 .validate((data) => 
      data['new_bob_status'].trim() !== ""
 )
 .on("data-invalid", function(data){
    // csvStream.write(Object.assign({query: ''}));
})
 .on("data", function(data){
     csvStream.write(Object.assign({}, {query: `UPDATE sales_order_item SET fk_sales_order_item_status = (SELECT id_sales_order_item_status FROM sales_order_item_status WHERE NAME = "${data.new_bob_status}") WHERE id_sales_order_item =${data.bob_sales_order_item_id};`}))
     // csvStream.end();     
     // process.exit();
 })
 .on("end", function(){
     console.log("done");
     csvStream.end();
 });