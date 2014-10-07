(function() {
  /**
  * d3 spinner widget
  * @param (object) args
  * @returns spinner object
  */
  d3.spinner = function(args){

    var self = this;

    //active bar id
    this.current = 0;

    //array for saving the individual steps
    this.stepsData = [];

    //basic d3 line function
    this.lineFunction = d3.svg.line().x(function(d) { return d.x; }).y(function(d) { return d.y; }).interpolate("linear");

    this.initialize = function(args){

      if (!args) throw "d3.spinner needs at least a reference to an element";
      if (!args.element) throw "d3.spinner needs a reference to an element";

      //Default Element
      this.defaults = {
        //height of the container for the spinner
        height : 50,
        //width of the container for the spinner
        width : 50,
        //number of strokes
        steps : 15,
        //ratio of the inner circle to the outer circle
        inner_radius : 0.7,
        //show tail or not
        tail : true,
        //Interval Time
        time : 100,
        //Container
        element : false,
        //radius of the spinner
        radius : 0,
        //base css class
        cls : 'spinner-step'
      };

      //Merge the initial option provided by the user with the default parameters
      this.config = d3.tools.extend( this.defaults , args );

      //Fitting the spinner into the width / height container
      this.config.radius = this.config.height > this.config.width ? this.config.width : this.config.height;

      this.render();

      this.interval = setInterval(function(){ self.update(); }, this.config.time);
    };

    this.render = function(){
      //the svg container
      this.svg = this.config.element.append("svg")
        .attr("class", "spinner")
        .attr("width", this.config.width)
        .attr("height", this.config.height);

      var stepSize = (360/(this.config.steps*2))/180 * Math.PI;

      for(var i = 0; i<this.config.steps; i++){
        var stepData = [  { "x": this.config.width/2 + d3.tools.polarToCartesian(stepSize*(i*2), this.config.radius/2*this.config.inner_radius)[0],     "y": this.config.height/2 + d3.tools.polarToCartesian(stepSize*(i*2), this.config.radius/2*this.config.inner_radius)[1]},
                          { "x": this.config.width/2 + d3.tools.polarToCartesian(stepSize*(i*2), this.config.radius/2)[0],                              "y": this.config.height/2 + d3.tools.polarToCartesian(stepSize*(i*2), this.config.radius/2)[1]},
                          { "x": this.config.width/2 + d3.tools.polarToCartesian(stepSize*(i*2+1), this.config.radius/2)[0],                            "y": this.config.height/2 + d3.tools.polarToCartesian(stepSize*(i*2+1), this.config.radius/2)[1]},
                          { "x": this.config.width/2 + d3.tools.polarToCartesian(stepSize*(i*2+1), this.config.radius/2*this.config.inner_radius)[0],   "y": this.config.height/2 + d3.tools.polarToCartesian(stepSize*(i*2+1), this.config.radius/2*this.config.inner_radius)[1]},
                          { "x": this.config.width/2 + d3.tools.polarToCartesian(stepSize*(i*2), this.config.radius/2*this.config.inner_radius)[0],     "y": this.config.height/2 + d3.tools.polarToCartesian(stepSize*(i*2), this.config.radius/2*this.config.inner_radius)[1]}
        ];
        this.stepsData[i] = this.svg.append("path").attr("id", "step_"+i).attr("class", this.config.cls).attr("d", this.lineFunction(stepData));
      }
    };

    this.update = function(){
      for(var i = 0; i<this.config.steps; i++){
        if(i != this.current){
          d3.select('#step_'+i).attr('class', this.config.cls);
        }else{
          d3.tools.addClass(d3.select('#step_'+i), 'active');
        }
      }

      if(this.config.tail){
        for(var i = 1; i<5; i++){
          var ii = this.current - i;
          if(ii < 0 ){
            ii += this.config.steps;
          }
          d3.tools.addClass(d3.select('#step_'+ii), 'active-'+i);
        }
      }

      this.current++;
      if(this.current >= this.config.steps){
        this.current = 0;
      }
    };

    this.destroy = function(){
      clearInterval(this.interval);
    };

    this.initialize(args);
  };
})();