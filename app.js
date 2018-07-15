var express = require('express'); 
var app = express(); 
var server = require('http').createServer(app); 
var io = require('socket.io').listen(server);
var port = process.env.PORT || 3000;


var oxford = require('project-oxford');
var client = new oxford.Client('5c0e69eeb71141e0888eb6158adf1e61', 'westcentralus');

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
