Installation
-----------

    $ mrt add view-manager

Usage
-----


The View manager helps to set views at specific locations in your app.


Place a template helper for `myViewKey` somewhere in your app:

    {{> DynamicTemplate placeholder="myViewKey" context=someData}}

To render a template in that place call

    View.set('myViewKey', 'myTemplate');
    
Additional you can set the data context dynamically
This context will then be merged with the context passed in template (dynamic content overwrites template set context)

    View.set('myViewKey', {
        tenplate: 'myTemplate',
        context: {
            some: 'data'
        }
    });

To unrender the template call

    View.set('myViewKey', false);


This library also provides {{> StaticTemplate}}

    {{> StaticTemplate template="myTemplateNameString" context=someData}}


Additional methods are:

    - setDefault(key, value)    = Sets a value without causing a reactivity
    - equals(key, value)        = Checks, whether the key has the given value, returns a boolean
    - getTemplate(name, context)   = Returns a template, useful inside template helpers, `name` can also be an object of {template: 'templateName', context: {...}}
    - getTemplateName(template) = Returns the given template name. also when passed an object like {template: 'templateName', context: {...}}. Mostly used internally
    - isTemplate(template)      = Returns a boolean, whether a template with that name exists or not.
    - {{StaticTemplate}}        = Helper, which works like {{> ...}} but also accepts strings as template names e.g. {{StaticTemplate "/ordered/template"}}
