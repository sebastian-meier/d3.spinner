function spinner(args) {
  //Default Element
  var defaults = {
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
    //radius of the spinner
    radius : 50,
    //base css class
    cls : 'spinner-step'
  };

  //Merge the initial option provided by the user with the default parameters
  var config = d3.tools.extend( defaults , args ),

  //Radians size of each step
  stepSize = (360/(config.steps*2))/180 * Math.PI,

  //basic d3 line function
  lineFunction = d3.svg.line().x(function(d) { return d.x; }).y(function(d) { return d.y; }).interpolate("linear");

  //Fitting the spinner into the width / height container
  config.radius = config.height > config.width ? config.width : config.height;

  var mySelection;

  function my(selection) {
    mySelection = selection;
    selection.each(function(d, i) {
      var g = d3.select(this).append("g").attr("class", "spinner").attr("current", 0);

      //Drawing the steps
      for(var i = 0; i<config.steps; i++){
        var stepData = [  { "x": config.width/2 + d3.tools.polarToCartesian(stepSize*(i*2), config.radius/2*config.inner_radius)[0],     "y": config.height/2 + d3.tools.polarToCartesian(stepSize*(i*2), config.radius/2*config.inner_radius)[1]},
                          { "x": config.width/2 + d3.tools.polarToCartesian(stepSize*(i*2), config.radius/2)[0],                              "y": config.height/2 + d3.tools.polarToCartesian(stepSize*(i*2), config.radius/2)[1]},
                          { "x": config.width/2 + d3.tools.polarToCartesian(stepSize*(i*2+1), config.radius/2)[0],                            "y": config.height/2 + d3.tools.polarToCartesian(stepSize*(i*2+1), config.radius/2)[1]},
                          { "x": config.width/2 + d3.tools.polarToCartesian(stepSize*(i*2+1), config.radius/2*config.inner_radius)[0],   "y": config.height/2 + d3.tools.polarToCartesian(stepSize*(i*2+1), config.radius/2*config.inner_radius)[1]},
                          { "x": config.width/2 + d3.tools.polarToCartesian(stepSize*(i*2), config.radius/2*config.inner_radius)[0],     "y": config.height/2 + d3.tools.polarToCartesian(stepSize*(i*2), config.radius/2*config.inner_radius)[1]}
        ];
        g.append("path").attr("class", config.cls+" step_"+i).attr("d", lineFunction(stepData));
      }
      
    });

    //Starting the animation
    interval = setInterval(function(){ my.update(); }, config.time);
  }

  my.update = function(){
    mySelection.each(function(d, i){
      var self = d3.select(this);
      var current = self.select(".spinner").attr("current");
      for(var i = 0; i<config.steps; i++){
        if(i != current){
          self.select('.step_'+i).attr('class', config.cls+" step_"+i);
        }else{
          d3.tools.addClass(self.select('.step_'+i), 'active');
        }
      }

      if(config.tail){
        for(var i = 1; i<5; i++){
          var ii = current - i;
          if(ii < 0 ){
            ii += config.steps;
          }
          d3.tools.addClass(self.select('.step_'+ii), 'active-'+i);
        }
      }

      current++;
      if(current >= config.steps){
        current = 0;
      }

      self.select(".spinner").attr("current", current);
    });
  }

  my.destroy = function(){
    clearInterval(interval);
  }

  return my;
}