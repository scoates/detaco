var url_parse = require('url').parse;

var version = '0.1.0';

var resolve_url = function (url, callback) {

	var parsed = url_parse(url);
	switch (parsed.protocol) {
		case 'http:':
			parsed.port = parsed.port || 80;
			client = require('http');
			break;
		case 'https:':
			parsed.port = parsed.port || 443;
			client = require('https');
			break;
		default:
			callback(false);
	}

	var hostHeader = parsed.hostname;
	var userAgent = 'detaco/' + version + ' node.js/' + process.version;

	var headers = {
		'user-agent': userAgent,
		'host': hostHeader,
		'connection': 'close',
	};
	var params = {
		host: parsed.hostname,
		port: parsed.port,
		method: 'GET',
		path: parsed.path,
		headers: headers
	};
	client.get(params, function(res) {
		if (res.headers.location) {
			callback(res.headers.location);
			return;
		}
		callback(null);
	}).on('error', function(e) {
		callback(null, e);
	});
};
exports.resolve_url = resolve_url;

exports.resolve_string = function (str, callback) {
	var match = str.match(/https?:\/\/t\.co\/[a-z0-9]+/ig);
	if (!match) {
		callback(str);
		return;
	}

	var remaining = match.length;
	var replace = function (from, to) {
		str = str.replace(from, to);
		remaining--;
		if (remaining == 0) {
			// we've resolved all of the matches, so fire the callback
			callback(str);
		}
	};
	match.forEach(function (url) {
		resolve_url(url, function (resolved) {
			replace(url, resolved);
		});
	});
};

