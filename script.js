$(function(){
    
    var api = new PhSc.Api();
    api.addClass(new PhSc.Class({
        name : "Phalcon\\Mvc\\RouterInterface"
    }));
    api.addClass(new PhSc.Class({
        name : "Phalcon\\DiInterface"
    }));
    api.addClass(new PhSc.Class({
        name : "Phalcon\\Events\\ManagerInterface"
    }));
    
    var application = new PhSc.Class({
        name : "Phalcon\\Mvc\\Application"
    });
    application.addMethod(new PhSc.Method({
        name : "setDI"
    }));
    application.addMethod(new PhSc.Method({
        name : "setEventsManager"
    }));
    
    api.addClass(application);
    
    
    
    
    var process = new PhSc.Process({
        "baseClass" : "Phalcon\\Mvc\\Application",
        "method"    : "handle",
        "steps"     : [
            
            new PhSc.Step({
                "type" : "basic",
                "title": "Get the @see:Phalcon\\DiInterface(Di)",
                "description" : "Get the @see:Phalcon\\DiInterface(Di) that was @see:Phalcon\\Mvc\\Application::setDI(set) before handling "
            }),
            new PhSc.Step({
                "type" : "basic",
                "title": "Get the @see:Phalcon\\Events\\ManagerInterface(EventManager)",
                "description" : "Get the @see:Phalcon\\Events\\ManagerInterface that was @see:Phalcon\\Mvc\\Application::setEventsManager(set) before handling "
            }),
            new PhSc.Step({
                "type" : "event",
                "title": "application:boot",
                "description" : "Fire the event application:boot"
            })
          
            
            
        ]
    });
    
    
    var render = new PhSc.Render();
    render.api = api;
    
    var $process = render.renderProcess(process);

    
    $("#process").append($process);
    
});