Package.describe({
    summary: "a View Manager, works like Session, with some extras"
});

Package.on_use(function (api) {
    api.use('templating', 'client');
    api.use('handlebars', 'client');
    api.use('underscore', 'client');
    api.use('deps', 'client');

    // EXPORT
    api.export('View');

    // FILES
    api.add_files('view.js', 'client');
});

Package.on_test(function (api) {

    api.use('view-manager');
    api.use('tinytest');

    api.add_files('view_tests.js', 'client');

});