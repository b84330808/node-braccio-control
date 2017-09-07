var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(3001);

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

var port = parseInt(process.env.PORT, 10) || 3000;

app.use(express.static(__dirname + '/'));
app.set('port', port);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.listen(port, function() {
    console.log('Example app listening on port 3000!')
})

io.on('connection', function(client) {
    console.log('Client connected...');
    // client.emit('news', { hello: 'world' });
    client.on('send', function(data) {
        //send to serialport
        console.log(data);
    })
});
