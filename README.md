Installation
-----------

    $ mrt add view-manager

Usage
-----


The View manager helps to set views at specific locations in your app.


Place a template helper for `myViewKey` somewhere in your app:

    {{DynamicTemplate "myViewKey"}}

To render a template in that place call

    View.set('myViewKey', 'myTemplate');

To unrender the template call

    View.set('myViewKey', false);


Additional methods are:

    - setDefault(key, value)    = Sets a value without causing a reactivity
    - equals(key, value)        = Checks, whether the key has the given value, returns a boolean
    - getTemplate(name, data)   = Returns a template, useful inside template helpers, `name` can also be an object of {template: 'templateName', data: {...}}
    - getTemplateName(template) = Returns the given template name. also when passed an object like {template: 'templateName', data: {...}}. Mostly used internally
    - isTemplate(template)      = Returns a boolean, whether a template with that name exists or not.
    - {{StaticTemplate}}        = Helper, which works like {{> ...}} but also accepts strings as template names e.g. {{StaticTemplate "/ordered/template"}}