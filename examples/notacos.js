var detaco = require('../lib/detaco');

detaco.resolve_url('http://t.co/n2OHioV', function (msg) {
	console.log("resolve_url:", msg);
});

detaco.resolve_string('Testing a taco link thing (please ignore; or click (-: ) http://t.co/GOOmqPYo https://t.co/3jB0tITR', function(msg) {
	console.log("resolve_string:", msg);
});

