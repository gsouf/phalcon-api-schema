var PhSc = (function($){

    var PhSc = {};
    
    PhSc.namespace = "PhSc";
    
    
    //****************
    // PROCESS
    //****************
    
    PhSc.Process = function(options){
        
        var defaultOptions = {
            
            "steps" : [],
            "baseClass" : null
            
        };
        
        $.extend(this,defaultOptions,options); 
        
    };
    
    PhSc.Process.prototype = {
        
        addStep : function(step){
            this.steps.push(step);
        }
        
    };
    
    
    
    //****************
    // API
    //****************
    
    PhSc.Api = function(options){
        
        var defaultOptions = {
            
            "baseUrl" : "http://api.phalconphp.com/"
            
        };
        
        $.extend(this,defaultOptions,options); 
        
        this.classes = {};
        
    };
    
    PhSc.Api.prototype = {
        
        "addClass" : function(oClass){
            this.classes[oClass.name] = oClass;
        },
                
        'url'       : function(uri){
            return this.baseUrl + uri;
        }
        
    };
    
    
    //****************
    // STEP
    //****************
    
    PhSc.Step = function(options){
        var defaultOptions = {
            
            "type"          : "basic",
            "title"         : "",
            "description"   : "",
            "subProcess"    : null,
            "eventName"     : null
            
        };
        
        $.extend(this,defaultOptions,options); 
        
    };
    
    

    //****************
    // CLASS
    //****************
    
    PhSc.Class = function(options){

        var defaultOptions = {

            "name"      : null,
            "methods"   : {},
            "url"       : null

        };
        
        $.extend(this,defaultOptions,options); 
    };
    
    PhSc.Class.prototype.getUrl = function(){
      
        if(this.url){
            return this.url;
        }else{
            return this.name.replace(/\\/g,"/");
        }
        
    };
    
    PhSc.Class.prototype.addMethod = function(method){
        
        this.methods[method.name] = method;
        method.class = this;
        
    };
    
    PhSc.Class.prototype.findMethod = function(name){
       return this.methods[name];
    };
    
    //****************
    // METHOD
    //****************
    
    PhSc.Method = function(options){

        var defaultOptions = {
            "name"      : null,
            "url"       : null,
            "class"     : null
        };
        
        $.extend(this,defaultOptions,options); 
    };
    
    PhSc.Method.prototype.getUrl = function(){
      
        if(this.url){
            return this.url;
        }else{
            return this.class.getUrl() + "#" + this.name + "-details";
        }
        
    };
    
    
    //****************
    // makeClass
    //****************
    
    PhSc.makeClass = function(name){
        return PhSc.namespace + "-" + name;
    };
    
    
    PhSc.toMarkdown = function(text,api){
        
        // search for   @see:classname
        // or           @see:classname(replacement)
        // or           @see:classname::method
        // or           @see:classname::method(replacement)
        // or           @see:http://url
        // or           @see:http://url(replacement)
        text = text.replace(/@see:([^:\(\s]+)(::([a-zA-Z0-9_]*)){0,1}(\(([^\)]+)\)){0,1}/g,function(a,$1,$2,$3,$4,$5){
            
            var className = $1;
            var methodName= $3;
            var replacemenet= $5;
            
            

  
            var oClass = api.classes[className];
            
       
            
            if(oClass){
                
                if(methodName){
                    var method = oClass.findMethod(methodName);
                    console.log(methodName.length);
                    if(method){
                        var url = api.url(method.getUrl());
                        return "[" + (replacemenet ?replacemenet : className+"::"+methodName ) +"](" + url + ")";
                    }
                }else{
                    var url = api.url(oClass.getUrl());
                    return "[" + (replacemenet ?replacemenet : oClass.name) +"](" + url + ")";
                }

            }
            
            if(/^http(s{0,1}):\/\//.test(className)){
                var url = className;
                return "[" + (replacemenet ? replacemenet : url) +"](" + url + ")";
            }else{
                return a;
            }
            
        });
        
      
        
        return text;
    };
    
    
    return PhSc;
    
})(jQuery);