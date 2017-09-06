var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var SerialPort = require('serialport');

// var port = new SerialPort('COM12', {
//     baudRate: 9600
// });


// port.write('main screen turn on', function(err) {
//     if (err) {
//         return console.log('Error on write: ', err.message);
//     }
//     console.log('message written');
// });

// // Open errors will be emitted as an error event
// port.on('error', function(err) {
//     console.log('Error: ', err.message);
// })


app.use(express.static(__dirname + '/'));


// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/index.html')
// })

app.listen(8080, function() {
    console.log('Example app listening on port 8080!')
})

io.on('connection', function(client) {
    console.log('Client connected...');
    client.emit('news', { hello: 'world' });
    client.on('join', function(data) {
        console.log(data);
    })
});