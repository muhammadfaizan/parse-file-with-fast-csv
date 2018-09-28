# Parse File With Fast CSV

## Description
This is a quick parser for any kind of formulas, to be applied and retrieved.

### How to load a file
- To load file, you need to put all your csvs that you want to `csv` folder.
- expect output files to be in your `csv-output` folder

### How to make changes


To change the validation login of a row, change  validate callback
```js
.validate((data) => data.myValue === true)
```

To change the output
```js
.on("data", function(data){
    csvStream.write({output: 'output here for each row'}))
})
```

# To run the script

Make sure you have nodejs installed.

```sh
$ npm i
$ node stream-file
```