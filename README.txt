Taken out from the homework assignment: 
	In this assignment, you will develop a set of REST APIs capable of reading a JSON file
	deployed on a server and returning information by using a collection of simple HTTP
	requests. You will also build a single HTML (twitterRest.html) web page in which the
	requests to the APIs will be invoked and the retrieved information will be displayed
	
Specification:
	Your RESTful APIs should be able to respond, with the appropriate data, to the
	following requests:
	● Get all tweets (create time, id, and tweet text) available in the archive.
	● Get all known Twitter users included in the archive.
	● Get a list of all external links (all links that appear in any field of a tweet. Use
	regular expressions) included in the tweets from the archive, the links should be
	grouped based on tweet ids.
	● Get the details about a given tweet (given the tweet’s id).
	● Get detailed profile information about a given Twitter user (given the user’s
	screen name).


URL for the website is:

https://dry-mountain-64187.herokuapp.com/


All GET HTTP Requests:

Get all tweets:
	/getalltweets

Get a tweet through its ID:
	/gettweet/:id

Get all users:
	/getusers

Get a user by its screen name:
	/getuser/:name

Get all links appearing in all the tweets:
	/getlinks
