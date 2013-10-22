"use strict";

Tinytest.add('view-manager package - store and deps properties should be present.', function(test){

    // Testing app initialisation with properties
    test.instanceOf(Layout, Object);
    test.instanceOf(View.store, Object);
    test.instanceOf(View.deps, Object);
});


Tinytest.add('view-manager package - _ensureDeps() should store Deps.Dependency for given key parameter.', function(test){

    // Create a key with dependecy
    View._ensureDeps('testKey');

    // Test
    test.instanceOf(View.deps['testKey'], Deps.Dependency);

    // Clean up
    delete View.deps['testKey'];
});


Tinytest.add('view-manager package - get() should create a dependecy for a key which does not exist.', function(test){

    // Get a key which was never set
    View.get('testKey');

    // Test
    test.instanceOf(View.deps['testKey'], Deps.Dependency);

    // Clean up
    delete View.deps['testKey'];
});


Tinytest.add('view-manager package - get() should return a set value.', function(test){

    // Get a key which was never set
    View.set('testKey','myValue');

    // Test
    test.equal(View.get('testKey'), 'myValue');

    // Clean up
    delete View.store['testKey'];
    delete View.deps['testKey'];
});


Tinytest.add('view-manager package - set() should call _ensureDeps function with defined key set.', function(test){

    // Call View.set('testKey') and test if View.deps['testKey'] is populated with Deps.Dependency
    View.set('testKey', 'templateName');
    test.instanceOf(View.deps['testKey'], Deps.Dependency);

    // Cleanup
    delete View.deps['testKey'];
    delete View.store['testKey'];
});


Tinytest.add('view-manager package - set() with "mainPane1" as the key param should set the keys "mainPane2" and "popupContainer" to FALSE".', function(test){

    // Setting key to 'mainPane1'
    View.set('mainPane1', 'dummy');
    test.equal(View.store['mainPane2'], false);
    test.equal(View.store['popupContainer'], false);
    test.equal(View.store['mainPane1'], 'dummy');

    // Cleanup
    delete View.store['mainPane1'];
    delete View.store['mainPane2'];
    delete View.store['popupContainer'];
    delete View.deps['mainPane1'];
});


Tinytest.add('view-manager package - set() should reload dependencies on change.', function(test){

    // Need to call the layout set function, then call it again and see if the Deps.Dependency in deps[key] had its changed() function called.
});


Tinytest.add('view-manager package - setDefault() should set View.deps[key] with Deps.Dependency and set View.store[key] with a value.', function(test){

    View.setDefault('testKey', 'dummy');

    // Is _ensureDeps storing a new Deps.Dependency? Let's find out!
    test.instanceOf(View.deps['testKey'], Deps.Dependency);

    // Is this function storing the key correctly? Let's check that out too!
    test.equal(View.store['testKey'], 'dummy');

    // Cleanup
    delete View.deps['testKey'];
    delete View.store['testKey'];
});


Tinytest.add('view-manager package - equals() check if the value stored at the index defined by key is equal.', function(test){

    View.set('testKey', 'dummy');

    // Should return true
    test.equal(View.equals('testKey', 'dummy'), true);
    // Should return false
    test.equal(View.equals('testKey', 'anotherdummy'), false);

    // Cleanup
    delete View.store['testKey'];
});
