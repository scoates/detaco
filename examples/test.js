var detaco = require('../lib/detaco');
var argv 	= process.argv[2];

if(argv === 'test') {
	console.log("RUNNING TEST SUITE");
	console.log("--------------------------------\n");
	var test = {};

	// SHOULD PASS
	test.a = [
		'http://t.co/abcd',
		'http://goo.gl/abcd',
		'http://tr.im/abcd',
		'http://cli.gs/abcd',
		'http://bit.ly/abcd',
		'http://short.ie/abcd',
		'http://kl.am/abcd',
		'http://is.gd/abcd',
		'http://hex.io/abcd',
		'http://tinyurl.com/abcd',
		'http://tiny.cc/abcd'
	];

	// SHOULD PASS
	test.b = [
		'https://t.co/abcd',
		'https://goo.gl/abcd',
		'https://tr.im/abcd',
		'https://cli.gs/abcd',
		'https://bit.ly/abcd',
		'https://short.ie/abcd',
		'https://kl.am/abcd',
		'https://is.gd/abcd',
		'https://hex.io/abcd',
		'https://tinyurl.com/abcd',
		'https://tiny.cc/abcd'
	];

	// SHOULD PASS
	test.c = [
		'https://t.co?url=abcd',
		'https://goo.gl?url=abcd',
		'https://tr.im?url=abcd',
		'https://cli.gs?url=abcd',
		'https://bit.ly?url=abcd',
		'https://short.ie?url=abcd',
		'https://kl.am?url=abcd',
		'https://is.gd?url=abcd',
		'https://hex.io?url=abcd',
		'https://tinyurl.com?url=abcd',
		'https://tiny.cc?url=abcd'
	];

	// SHOULD FAIL
	test.d = [
		'https://t.co/',
		'https://goo.gl/',
		'https://tr.im/',
		'https://cli.gs/',
		'https://bit.ly/',
		'https://short.ie/',
		'https://kl.am/',
		'https://is.gd/',
		'https://hex.io/',
		'https://tinyurl.com/',
		'https://tiny.cc/'
	];

	// SHOULD FAIL
	test.e = [
		'https://t.co',
		'https://goo.gl',
		'https://tr.im',
		'https://cli.gs',
		'https://bit.ly',
		'https://short.ie',
		'https://kl.am',
		'https://is.gd',
		'https://hex.io',
		'https://tinyurl.com',
		'https://tiny.cc'
	];

	for(var key in test) {
		for(var i in test[key]) {
			detaco('valid_url', test[key][i], function(data) {
				if(key == 'd' || key == 'e') {
					var should = 'false';
				} else {
					var should = 'true';
				}

				console.log("EXPECT: " + should);
				console.log("OUTPUT: " + data + "\n");
			});
		}
	}

	console.log("\n--------------------------------\n");

	var tweet 	= 'Testing a taco link thing (please ignore; or click (-: ) http://t.co/GOOmqPYo https://t.co/3jB0tITR';
	var url 	= 'http://t.co/n2OHioV';

	detaco('string', tweet, function(decoded_tweet) {
		console.log("INPUT : " + tweet);
		console.log("EXPECT: Testing a taco link thing (please ignore; or click (-: ) http://gimmebar.com/view/4fa86274aac4229c6400001d https://gimmebar.com/view/4fa86274aac4229c6400001d");
		console.log("OUTPUT: " + decoded_tweet);
		console.log("\n--------------------------------\n");
	});

	detaco('url', url, function(decoded_url) {
		console.log("INPUT : " + url);
		console.log("EXPECT: http://tinyurl.com/7e3nfyn");
		console.log("OUTPUT: " + decoded_url);
		console.log("\n--------------------------------\n");
	});
} else {
	detaco('url', argv, function(data) {
		console.log("Resolved URL: " + data);
	});
}

