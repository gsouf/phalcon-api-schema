PhSc.Render = (function($,PhSc){

    var Render = function(){
        
        
        
    };
    
    Render.prototype = {
        
        renderProcess : function(process){
            
            var $process = $("<div>");
            $process.addClass(PhSc.makeClass("process-root"));
            $process.data("process",process);
            
            
            var $processTitle = $("<div>");
            $processTitle.addClass(PhSc.makeClass("process-title"));
            
            var $processSteps = $("<ul>");
            $processSteps.addClass(PhSc.makeClass("process-steps"));
            
            for(var i in process.steps){
                var step = process.steps[i];

                
                $processSteps.append(this.renderStep(step));
            }
            
            $process.append($processSteps);
            
            return $process;
        },
                
        renderStep      : function(step){
            
            var $step = $("<li>");
            $step.addClass(PhSc.makeClass("step"));
            $step.addClass(PhSc.makeClass("step-" + step.type));
            $step.data("step",step);
            
            var $stepTitle = $("<div>");
            $stepTitle.addClass(PhSc.makeClass("step-title"));
            $stepTitle.html(this.renderText(step.title));
            $step.append($stepTitle);
            
            if(step.subProcess){
                $step.append(this.renderProcess(step.subProcess));
            }
            
            if(step.description){
                var $description = $("<div>");
                $description.addClass(PhSc.makeClass("step-description"));
                $description.html(this.renderText(step.description));
                $step.append($description);
            }
            
            return $step;

        },
        
        renderText : function(text){
            var preparsed = PhSc.toMarkdown(text,this.api);
            
            var parsed = marked(preparsed);
            
            return parsed;
            
        }
        
    };
    
    return Render;
    
})(jQuery,PhSc);