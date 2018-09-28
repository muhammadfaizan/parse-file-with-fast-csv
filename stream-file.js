var csv = require("fast-csv");
var fs = require('fs');
var path = require('path')
var files = fs.readdirSync(`${__dirname}/csv`).filter(filename => filename.endsWith('.csv'));

function convertCsvToQuery(fileName) {
    var outputFile = `csv-output/${fileName}-queries.txt`;
    var csvStream = csv.createWriteStream(),
    writableStream = fs.createWriteStream(outputFile);

    writableStream.on("finish", function(){
        console.log("DONE!");
    });
   
    csvStream.pipe(writableStream);

    csv
    .fromPath('csv/' + fileName, {headers: true})
    .validate((data) => {
        var bobStatus = data['new_bob_status'] || data['bob_new_status'];
        return bobStatus && bobStatus.trim() !== "" && data['Needs to be fixed'] && data['Needs to be fixed'].trim() === 'Y'
    })
    .on("data-invalid", function(data){
    })
    .on("data", function(data){
        // console.log(data)
        var bobStatus = data['new_bob_status'] || data['bob_new_status'];
        csvStream.write(Object.assign({}, {query: `UPDATE sales_order_item SET fk_sales_order_item_status = (SELECT id_sales_order_item_status FROM sales_order_item_status WHERE NAME = '${bobStatus}') WHERE id_sales_order_item =${data.bob_sales_order_item_id};`}))
    })
    .on("end", function(){
        console.log("done");
        csvStream.end();
    });
}

files.forEach(convertCsvToQuery);
// convertCsvToQuery('test.csv')