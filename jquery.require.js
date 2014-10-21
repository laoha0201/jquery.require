/*!
 * jQuery Require Plugin v1.0.0
 * https://github.com/masalygin/jquery.require
 *
 * Copyright 2014 Ilya Masalygin
 * Released under the MIT license
 */

(function($) {

	var require = function(options) {

		if ($.type(options) !== 'object') {
			return require({files: [].slice.call(arguments)});
		}

		options = $.extend({}, {
			files: [],
			async: true,
			cache: true,
			once: true
		}, options);

		return options.async ? require.async(options) : require.sync(options);

	};

	$.extend(require, {

		cache: {},

		clear: function(type) {

			if (type) {
				delete require.cache[type];
			} else {
				require.cache = {};
			}

		},

		async: function(options) {

			var deferred = [];

			$.each(options.files, function(index, url) {
				deferred.push(require.load(url, options));
			});

			return $.when.apply($, deferred);

		},

		sync: function(options) {

			return (function(options) {

				var deferred = $.Deferred();
				var files = options.files;
				var len = files.length;
				var index = 0;

				function load(file) {
					require.load(file, options).done(function() {
						if (++index < len) {
							load(files[index]);
						} else {
							deferred.resolve();
						}
					});
				}

				load(files[index]);

				return deferred.promise();

			})(options);

		},

		load: function(url, options) {

			var parts = url.split('.');
			var ext = parts[parts.length - 1];

			if (require[ext]) {

				if (options.once) {

					if (!require.cache[ext]) {
						require.cache[ext] = {};
					}

					if (!require.cache[ext][url]) {
						require.cache[ext][url] = require[ext](url, options);
					}

					return require.cache[ext][url];

				} else {

					return require[ext](url, options);

				}

			}

			throw new Error('extension ' + ext + ' is not supported');

		},

		js: function(url, options) {

			return $.ajax({
				dataType: 'script',
				cache: options.cache,
				url: url
			});

		},

		css: function(url, options) {

			var deferred = $.Deferred();
			var img;

			if (!options.cache) {
				url += '?_=' + $.now();
			}

			$('<link>', {
				rel: 'stylesheet',
				href: url
			}).appendTo(document.head);

			img = new Image();
			img.onerror = function() {
				deferred.resolve();
			};
			img.src = url;

			return deferred.promise();

		}

	});


	$.require = require;

})(jQuery);