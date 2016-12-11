var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hi my name is ______\n');
})

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
   
    // Console will print to the console
	console.log('Console.log works!')
	console.log('My age is ___')
	console.log('Server running at http://127.0.0.1:3000/');
	console.log('Server also running at http://localhost:3000/');
})