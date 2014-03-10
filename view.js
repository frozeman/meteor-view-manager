/**
View package.

The View session, for displaying views.
This is based on https://github.com/EventedMind/meteor-build-a-reactive-data-source

@module package view-manager
**/


/**
The reactive View class is used to set and get the views of the app.

Be aware that they can only be used inside a handlebars template like:

    <div>
        {{myHelper}}
    <div>

@class View-Handlebars-helpers
@static
**/


/**
Get the current template set in an `View` key and place it inside the current template.

    {{> DynamicTemplate placeholder="myTemplateKey" context=someData}}


@method DynamicTemplate
@return {Object|undefined} The template to be placed inside the current template or undefined when no template was set to this key
**/
Template['DynamicTemplate'].getTemplate = function () {
    var template = View.get(this.placeholder);
    if(template && View.getTemplateName(template)) {
        return View.getTemplate(template, this.context, true);
    } else
        return null;
};


/**
Works like the {{> }} helper, but accepts also strings as paramter.
This way you can name you templates like "/better/ordered/template" or pass template names via variables.

    {{> StaticTemplate template="myTemplateKey" context=someData}}

@method StaticTemplate
@return {Object} The template to be placed inside the current template
**/
Template['StaticTemplate'].getTemplate = function () {
    if(this.template && View.getTemplateName(this.template)) {
        return View.getTemplate(this.template, this.context, true);
    } else
        return null;
};




/**
The reactive View class is used to set and get the views of the app.

@class View
@static
**/
View = {
    /**
    This object stores all keys and their values.

    @property keys
    @type Object
    @default {}
    @example

        {
            mainPane: "panes/unrated",
            ...
        }

    **/
    keys: {},


    /**
    Keeps the dependencies for the keys in the store.

    @property deps
    @type Object
    @default {}
    @example

        {
            mainPane: new Deps.Dependency,
            ...
        }

    **/
    deps: {},


    // METHODS

    // PRIVATE
    /**
    Creates at least ones a `Deps.Dependency` object to a key.

    @method _ensureDeps
    @private
    @param {String} key     the name of the key to add a dependecy tracker to
    @return undefined
    **/
    _ensureDeps: function (key) {
        if (!this.deps[key]){
            this.deps[key] = new Deps.Dependency;
        }
    },


    // PUBLIC

    /**
    When get is called we create a `Deps.Dependency.depend()` for that key in the store.

    @method get
    @param {String} key     The key name to get
    @return {Object|String} The template name or template object like:

        {
            template: "templateName",
            context: {
                key: "value"
            }
        }

    **/
    get: function (key) {
        this._ensureDeps(key);
        this.deps[key].depend();
        return this.keys[key];
    },


    /**
    When set is called every depending reactive function where `View.get()` with the same key is called will rerun.

    @method set
    @param {String}        key       The key name to set a template to
    @param {String|Object} value     A template name or an Object. When using the following keys the objects should look as follows:

    **When using any template**

        'templateName'

        or

        {
            template: 'templateName',
            context: {
                key: 'value'
            }
        }

    @return undefined
    **/
    set: function (key, value) {
        this._ensureDeps(key);

        // make sure if passed an object it has the right structure
        if(_.isObject(value) && !(value.template || (value.content))) {
            if(window.console)
                console.warn('View.set() needs an Object with at least a template property');

            return;
        }

        // only reload the dependencies, when value actually changed
        if(((_.isString(value) || _.isBoolean(value)) && this.keys[key] !== value) ||
           (_.isObject(value) && !_.isEqual(this.keys[key], value))) {
            this.keys[key] = value;
            this.deps[key].changed();
        }
    },


    /**
    Set a value to a key without reactive changes.

    @method setDefault
    @param {String}        key       The key name to set a template to
    @param {String|Object} value     A template name or an Object. See `View.set()` for details.
    @return undefined
    **/
    setDefault: function (key, value) {
        this._ensureDeps(key);
        this.keys[key] = value;
    },


    /**
    Checks if values are equal, but is not reactive.

    @method equals
    @param {String}        key       The key name to set a template to
    @param {String|Object} value     A template name or an Object. See `View.set()` for details.
    @return {Boolean}
    **/
    equals: function(key, value){
        // this._ensureDeps(key);
        // this.deps[key].depend();
        return (this.keys[key] === value) ? true : false;
    },


    /**
    Get the templates.

    **Note:** When both, a object with `template` and `context` is passed and also an additonal data context using the `data` parameter.
    Then both context objects will be combinded, where the context property from the template object overwrites the one given in the `data` parameter.


    @method getTemplate
    @param {String|Object} name   The name of the template, or an object like:

        {
            template: 'xyz',
            context: {
                key: 'value'
            }
        }

    @param {Object} context   The data context to pass to that template
    @param {Boolean} returnObject whether to return an object or a template
    @return {Object|Empty String} Template instance for use in a template helpers return value
    **/
    getTemplate: function(name, context, returnObject) {

        if(!name)
            return '';

        // make sure the context object is not the window object
        context = (context instanceof Window) ? {} : context;

        // check if "name" contains also the context
        if(_.isString(name)) {
            name = {
                template: name
            }

        // if object, use the context from the object
        } else if(_.isObject(name) && name.context) {

            // make sure the context object is not the window object
            name.context = (context instanceof Window) ? {} : name.context;

            // add the context object to the passed context object, of the template
            if(_.isObject(context))
                context = _.extend(context, name.context);
            else
                context = name.context;
        }

        // never set an undefined context
        if(!context)
            context = {};


        if(Template[name.template]) {
            if(returnObject) {
                return {
                    template: Template[name.template],
                    context: context
                };
            } else {
                return (_.isEmpty(context))
                    ? Template[name.template]
                    : Template[name.template].extend({data: context});
            }
        } else
            return null;
    },


    /**
    Gets the template name.

    @method getTemplateName
    @param {String|Object} template   The name of the template, or an object like:

        {
            template: 'xyz',
            context: {
                key: 'value'
            }
        }

    @return {String} The name of the template
    **/
    getTemplateName: function(template) {
        return (_.isObject(template) && template.template) ? template.template : template;
    },


    /**
    Checks whether a template exists or not.

    @method isTemplate
    @param {String|Object} template   The name of the template, or an object like:

        {
            template: 'xyz',
            context: {
                key: 'value'
            }
        }

    @return {Boolean} TRUE if the template exists, FALSE if not
    **/
    isTemplate: function(template) {
        if(_.isObject(template) && template.template) {
            return (Template[template.template]) ? true : false;
        } else {
            return (Template[template]) ? true : false;
        }
    }

};

