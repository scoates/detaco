Resolve t.co (taco, Twitter) URLs in Node.JS

```javascript

var detaco = require('detaco');

var tweet 	= 'Testing a taco link thing (please ignore; or click (-: ) http://t.co/GOOmqPYo https://t.co/3jB0tITR';
var url 	= 'http://t.co/n2OHioV';

/**
Usage: detaco(type, subject, callback);
- type: 'url' or 'string',
- subject: string with either 'string' of text, or 'url' to decode.
- callback: function, takes one argument with decoded 'string' or 'url'.
**/

detaco('string', tweet, function(decoded_tweet) {
	console.log("Resolved Tweet: " + decoded_tweet);
});

detaco('url', url, function(decoded_url) {
	console.log("Resolved URL: " + decoded_url);
});

/** 
Output:
Resolved URL: http://tinyurl.com/7e3nfyn
Resolved Tweet: Testing a taco link thing (please ignore; or click (-: ) http://gimmebar.com/view/4fa86274aac4229c6400001d https://gimmebar.com/view/4fa86274aac4229c6400001d
**/

```