var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.sendFile('public/index.html', {root: __dirname});
})

app.get('/getalltweets', function(req, res) {
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

app.get('/getusers', function(req, res) {
	fs.readFile('favs.json', 'utf8', function (err, data) {
		if (err) {throw err;}

		var obj = JSON.parse(data);

		var users = [];

		for (var i = 0; i < obj.length; i++) {
			users.push(obj[i].user);
		}
		//console.log(users.length);
		res.end(JSON.stringify(users));
	});
})

app.get('/getuser/:name', function(req, res) {
	fs.readFile('favs.json', 'utf8', function (err, data) {
		if (err) {throw err;}
		var name = req.params.name;

		var obj = JSON.parse(data);

		var found = false;

		for(var i = 0; i < obj.length; i++) {
			var user = obj[i].user;
			if(user["screen_name"] == name) {
				//Want JSON result to be an array instead of object. 
				//Reason: for frontend (Creating the table)
				var arr = [user];
				res.end(JSON.stringify(arr));
				found = true;
				break;
			}
		}

		if(!found) {
			res.end("Couldn't find user");
		}
	});
})

app.get('/gettweet/:id', function(req, res) {
	var id = req.params.id;
	fs.readFile('favs.json', 'utf8', function (err, data) {
		if (err) {
			throw err;
		}

		var found = false;

		var obj = JSON.parse(data);

		for (var i = 0; i < obj.length; i++) {
			if(obj[i].id == id) {
				//Want JSON result to be an array instead of object. 
				//Reason: for frontend (Creating the table)
				var arr = [obj[i]];
				res.end(JSON.stringify(arr));
				found = true;
				break;
			}
		}

		if(!found) {
			res.end("Couldn't find tweet");
		}
	});
})

app.get('/getlinks', function(req, res) {
	fs.readFile('favs.json', 'utf8', function (err, data) {
		if (err) {
			throw err;
		}
		var obj = JSON.parse(data);

		var regularexp = /(http?:\/\/[^\s]+)/g;
		
		var links = [];

		for(var i = 0; i < obj.length; i++) {
			var tempArr = obj[i].text.match(regularexp);
			var link = {
				"id": obj[i].id,
				"links": tempArr
			}
			links.push(link);
		}
		res.end(JSON.stringify(links));
	});
})

//TO ACCESS THE JAVASCRIPT AND CSS FILES (CLIENT.JS AND STYLE.CSS) FROM INDEX.HTML
app.use("/public", express.static(__dirname + '/public'));

var port = process.env.PORT || 8080;

var server = app.listen(port, function () {

  console.log("Listening on port %s", port)

})
