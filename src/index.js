require('es6-promise').polyfill();

var denodeify = require('denodeify');
var marked    = require('marked');
var mustache  = require('mustache');
var readFile  = denodeify(require('fs').readFile);
var writeFile = denodeify(require('fs').writeFile);

Promise.all([
	readFile(__dirname + '/CV.md', 'utf-8'),
	readFile(__dirname + '/template.ms', 'utf-8')
])
.then(function() {
	var markdown = arguments[0][0];
	var template = arguments[0][1];

	var args = {
		title: "George Crawford's CV"
	};

	args.content = marked(markdown);
	var rendered = mustache.render(template, args);
	writeFile(__dirname + '/../public/CV.html', rendered, 'utf-8');
})
.catch(function (error) {
	console.error(error);
});