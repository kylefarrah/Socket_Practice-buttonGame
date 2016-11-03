// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();
var session = require('express-session');
var app = express();

app.use(session({secret: 'secretsessioncode'}));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});

var io = require('socket.io').listen(server)

io.sockets.on('connection', function(socket){
	console.log("I'm using a socket")
	console.log(socket.id)
	var counter = 0;

	socket.on("posting_form", function (data){
    	counter = counter + 1;
    	io.emit('server_response', {response: counter});
	})
})

