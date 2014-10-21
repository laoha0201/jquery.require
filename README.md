A simple jQuery plugin to load JS and CSS only once

Examples:

```js
$.require('lodash.js').done(function() {
	//use lodash
});

$.require('page.css').done(function() {
	//css is loaded
});

$.require('lodash.js', 'page.css').done(function() {
	//files is loaded asynchronously
});

$.require({
	files: ['lodash.js', 'page.css'],
	async: false // default true,
	once: false //default true,
	cache: false //default true
}).done(function() {
	
});

$.require({
	files: [
		'//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.3/highlight.min.js', // lib
		'//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.3/languages/1c.min.js' // plugin
	],
	async: false
}).done(function() {
	
	//use lib with plugin
	
});

$.require.clear('js'); // clear cache JS files
$.require.clear('css'); // clear cache CSS files
$.require.clear(); // clear all cache
```