var url_parse = require('url').parse;
var version = '0.1.1';

var valid_url = function(url) {
	url = url.replace(/http:\/\/|https:\/\//i, '');

	var valid = new Array(
		/t.co/i,
		/goo.gl/i,
		/tr.im/i,
		/cli.gs/i,
		/bit.ly/i,
		/short.ie/i,
		/kl.am/i,
		/is.gd/i,
		/hex.io/i,
		/tinyurl.com/i,
		/tiny.cc/i
	);

	var output = false;
	var cursor = 0;
	var total  = valid.length;

	while(output === false && cursor < total) {
		output = valid[cursor].test(url);
		cursor++;
	}

	if(url.split('/').length < 2) {
		if(url.split('?').length < 2) output = false;
		else if(url.split('?')[1] == '') output = false;
		else output = true;
	} else if(url.split('/')[1] == '') {
		if(url.split('?').length < 2) output = false;
		else if(url.split('?')[1] == '') output = false;
		else output = true;
	}

	return output;
}

var resolve_url = function (url, callback) {
	if(!valid_url(url)) return callback(url);

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

var resolve_string = function (str, callback) {
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

module.exports = function(type, subject, callback) {
	switch(type) {
		case 'url': 
			resolve_url(subject, callback);
			break;

		case 'string':
			resolve_string(subject, callback);
			break;

		case 'valid_url': 
			callback(valid_url(subject));
			break;

		default:
			throw new Error("Invalid type specified. Please choose 'url' or 'string'.");
			break;
	}
}