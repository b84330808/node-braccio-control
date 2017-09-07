var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(3001);
var SerialPort = require('serialport');

var serial = new SerialPort('/dev/cu.usbmodem1421', {
    baudRate: 9600
});


// Open errors will be emitted as an error event
serial.on('error', function(err) {
    console.log('Error: ', err.message);
})
serial.on('open', function(){
    console.log('Serial Port Opend');
    serial.on('data', function(data){
        console.log(data);
    });
});



var port = parseInt(process.env.PORT, 10) || 3000;

app.use(express.static(__dirname + '/'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001/");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/a.html')
})

app.listen(port, function() {
    console.log('Example app listening on port 3000!')
})



/**
 * Socket.io
 */
io.on('connection', function(client) {
    console.log('Client connected...');
    // client.emit('news', { hello: 'world' });
    client.on('send', function(data) {

        //send to serialport
        serial.write(data+"\n", function(err) {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written:'+data);
        });
    })
});
