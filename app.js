var express = require('express'); 
var app = express(); 
var server = require('http').createServer(app); 
var io = require('socket.io').listen(server);
var port = process.env.PORT || 3000;


var oxford = require('project-oxford');
var client = new oxford.Client('a668de7d85634222a6f40589220a0cbf', 'westcentralus');

server.listen(port, function(){
    console.log("Server Running on port 3000");
    
});

app.use(express.static(__dirname + '/public'));         // fetching the static files for frontend

io.on('connection', function(socket) { 
    socket.on('origimgurl', function(origimgurl) {
        console.log('face url: ' + origimgurl);


        client.face.detect({

            url: origimgurl,
            analyzesFaceLandmarks: true,
            analyzesHeadPose: true

        }).then(function(response) {

            socket.emit('face', response);
            console.log(response);

            });
        });
    });
