Package.describe({
    summary: "Meteor wrapper package for https://github.com/serkanyersen/ifvisible.js/"
});

Package.on_use(function (api) {

    // EXPORT
    api.export('ifvisible');

    // FILES
    api.add_files('lib/ifvisible.js/src/ifvisible.js', 'client');
});

// Package.on_test(function (api) {

//     api.use('tinytest');

// });