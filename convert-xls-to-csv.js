var fs = require('fs');
var path = require('path');
var files = fs.readdirSync(path.join([__dirname, 'excel'])).filter(filename => filename.endsWith('.xlsx'));

files.forEach(file)
convert('file.xlsx', { to: 'csv' });