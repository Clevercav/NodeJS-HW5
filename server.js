var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.sendFile('public/index.html', {root: __dirname});
})

app.get('/getAllTweets', function(req, res) {
	fs.readFile('favs.json', 'utf8', function (err, data) {
		if (err) {
			throw err;
		}
		var obj = JSON.parse(data);
		var tweets = [];
		for(var i = 0; i < obj.length; i++) {
			var tweet = {
				created: obj[i]["created_at"],
				id: obj[i].id,
				text: obj[i].text
			}
			tweets.push(tweet);
		}

		res.end(JSON.stringify(tweets));
	});
})

app.get('/getUsers', function(req, res) {
	fs.readFile('favs.json', 'utf8', function (err, data) {
		if (err) {throw err;}

		var obj = JSON.parse(data);

		var users = [];

		for (var i = 0; i < obj.length; i++) {
			users.push(obj[i].user);
		}
		console.log(users.length);
		res.end(JSON.stringify(users));
	});
})

app.get('/getUser/:name', function(req, res) {
	fs.readFile('favs.json', 'utf8', function (err, data) {
		if (err) {throw err;}
		var name = req.params.name;

		var obj = JSON.parse(data);

		var found = false;

		for(var i = 0; i < obj.length; i++) {
			var user = obj[i].user;
			if(user["screen_name"] == name) {
				res.end(JSON.stringify(user));
				found = true;
				break;
			}
		}

		if(!found) {
			res.end("Couldn't find user");
		}
	});
})

//TODO
app.get('/getTweet/:id', function(req, res) {
	var id = req.params.id;
	fs.readFile('favs.json', 'utf8', function (err, data) {
		if (err) {
			throw err;
		}
		//console.log(data);
		res.end(data);
	});
})


//TODO
app.get('/getLinks', function(req, res) {
	fs.readFile('favs.json', 'utf8', function (err, data) {
		if (err) {
			throw err;
		}
		var obj = JSON.parse(data);

		var alllinks = [];

		for(var i = 0; i < obj.length; i++) {
			var links = [];
			var link = {

			}
		}
		res.end(data);
	});
})

//TO ACCESS THE JAVASCRIPT AND CSS FILES (CLIENT.JS AND STYLE.CSS) FROM INDEX.HTML
app.use("/public", express.static(__dirname + '/public'));

var server = app.listen(3000, function () {

  var port = server.address().port

  console.log("Listening on port %s", port)

})
