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
            "methods"   : [],
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
        
        this.methods.push(method);
        method.class = this;
        
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
        
        // search for   @class|classname
        // or           @class|classname(replacement)
        text = text.replace(/@class\|([^\|\(\s]+)(\((.+)\)){0,1}/g,function(a,$1,$2,$3){

            
            var oClass = api.classes[$1];

            
            if(oClass){
                var url = api.url(oClass.getUrl());
                return "[" + ($3 ?$3 : oClass.name) +"](" + url + ")";
            }else{
                return a;
            }
            
        });
        
      
        
        return text;
    };
    
    
    return PhSc;
    
})(jQuery);