QUnit.testStart(function() {

	window.foo = 0;
	delete window._;
	$.require.clear();

});

QUnit.asyncTest('js: sync', function(assert) {

	expect(1);

	$.require({

		files: ['//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js', 'haslodash.js'],
		cache: false,
		async: false

	}).done(function() {

		assert.ok(window.hasLodash);
		QUnit.start();

	});

});

QUnit.asyncTest('js: async', function(assert) {

	expect(1);

	$.require({

		files: ['//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js', 'haslodash.js'],
		cache: false

	}).done(function() {

		assert.ok(!window.hasLodash);
		QUnit.start();

	});

});


QUnit.asyncTest('js: once + clear', function(assert) {

	expect(3);

	$.require('foo.js').done(function() {

		assert.equal(window.foo, 1);

		$.require('foo.js').done(function() {

			assert.equal(window.foo, 1);

			$.require.clear('js');

			$.require('foo.js').done(function() {

				assert.equal(window.foo, 2);

				QUnit.start();

			});

		});

	});

});


QUnit.asyncTest('js: once + async', function(assert) {

	expect(1);

	$.require({

		files: ['//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js', 'haslodash.js'],
		async: false

	}).done(function() {

		$.require({

			files: ['//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js', 'haslodash.js'],
			cache: false,
			async: true

		}).done(function() {

			assert.ok(window.hasLodash);
			QUnit.start();

		});

	});


});


QUnit.asyncTest('js + css', function(assert) {

	expect(2);

	$.require('foo.js', 'bar.css').done(function() {

		var width = $('#css').css('width');

		assert.equal(width, '50px');
		assert.equal(window.foo, 1);

		QUnit.start();

	});

});