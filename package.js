Package.describe({
    name: "mrt:view-manager",
    summary: "A View Manager allows to dynamically render views in a placeholder.",
    version: "0.1.7",
    git: "https://github.com/frozeman/meteor-view-manager.git"

});

Package.onUse(function (api) {
    api.versionsFrom('METEOR@0.9.0');

    // core
    api.use('templating', 'client');
    api.use('underscore', 'client');
    api.use('deps', 'client');

    // EXPORT
    api.export('View');

    // FILES
    api.addFiles('dynamicTemplate.html', 'client');
    api.addFiles('view.js', 'client');
});

Package.onTest(function (api) {

    api.use('mrt:view-manager');
    api.use('tinytest');

    api.addFiles('view_tests.js', 'client');

});