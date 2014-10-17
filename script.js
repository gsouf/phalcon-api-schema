$(function(){
    
    var api = new PhSc.Api();
    api.addClass(new PhSc.Class({
        name : "Phalcon\\Mvc\\RouterInterface"
    }));
    
    api.addClass(new PhSc.Class({
        name : "Phalcon\\Mvc\\Application"
    }));
    
    var process = new PhSc.Process({
        "baseClass" : "Phalcon\\Mvc\\Application",
        "method"    : "handle",
        "steps"     : [
            
            new PhSc.Step({
                "type" : "basic",
                "title": "Recuperation @class|Phalcon\\Mvc\\RouterInterface(Router cool) dans le @class|DI",
                "description" : "It will search the router directly into the DI. The router has been register to the key ``router``"
            }),
            
            new PhSc.Step({
                "type" : "event",
                "title": "recuperation @class|Phalcon\\Mvc\\RouterInterface Router dans le DI",
                "description" : "It will search the router directly into the DI. The router has been register to the key ``router``"
            }),
            
            new PhSc.Step({
                "type" : "event",
                "title": "Blabla ``router``",
                "description" : "It will search the router directly into the DI. The router has been register to the key ``router``",
                
                subProcess : new PhSc.Process({
                    "baseClass" : "Phalcon\\Mvc\\Application",
                    "method"    : "handle",
                    "steps"     : [

                        new PhSc.Step({
                            "type" : "basic",
                            "title": "Recuperation @class|Phalcon\\Mvc\\RouterInterface(Router cool) dans le @class|DI",
                            "description" : "It will search the router directly into the DI. The router has been register to the key ``router``"
                        }),
                    ]

                  

                 
                })
            }),
            
            
        ]
    });
    
    
    var render = new PhSc.Render();
    render.api = api;
    
    var $process = render.renderProcess(process);

    
    $("#process").append($process);
    
});