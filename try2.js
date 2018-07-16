var express = require('express'); 
var app = express(); 
var server = require('http').createServer(app); 
var io = require('socket.io').listen(server);
var port = process.env.PORT || 3000;
const request = require('request');
server.listen(port);
app.get('/', function (req, res) {
    res.send('hello world')
  })

var oxford = require('project-oxford')
var client = new oxford.Client('5c0e69eeb71141e0888eb6158adf1e61','westcentralus');

client.face.detect({
    // url: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Dagestani_man_and_woman.jpg',
    path: "./heman.jpeg",
    analyzesAge: true,
    analyzesGender: true
}).then(function (response) {
    response.forEach(reso => {
        console.log('The age is: ' + reso.faceAttributes.age);
        console.log('The gender is: ' + reso.faceAttributes.gender);
        
    });

}).catch(function (err) {
    console.log(err);
});
