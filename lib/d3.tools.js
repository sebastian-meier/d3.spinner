d3.tools = {

	keys: function(obj) {
		var keys = [];
		for (var key in obj) keys.push(key);
		return keys;
	},

	/**
    * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
    * @param obj1
    * @param obj2
    * @returns obj3 a new object based on obj1 and obj2
    */
	extend: function(destination, source) {
		var returnObj = {};
		for (var attrname in destination) { returnObj[attrname] = destination[attrname]; }
		for (var attrname in source) { returnObj[attrname] = source[attrname]; }
		return returnObj;
	},

	addClass: function(object, new_cls){
		var cls = object.attr('class');
		if(cls.indexOf(new_cls)==-1){
			cls += " "+new_cls;
		}
		object.attr('class', cls);
	},

	removeClass: function(object, new_cls){
		var cls = object.attr('class');
		if(cls.indexOf(new_cls)>-1){
			cls = cls.replace(new_cls, '');
			cls = cls.replace('  ', ' ');
		}
		object.attr('class', cls);
	},

	toggleClass: function(object, new_cls){
		var cls = object.attr('class');
		if(cls.indexOf(new_cls)>-1){
			cls = cls.replace(new_cls, '');
			cls = cls.replace('  ', ' ');
		}else{
			cls += " "+new_cls;
		}
		object.attr('class', cls);
	},

	clone: function(obj) {
		return JSON.parse(JSON.stringify(obj));
	},

	/**
    * Calculates x,y coordinates for angle, radius based on the polar-cartesian function
    * @param theta (float) angle in radians
    * @param radius (float)
    * @returns array of x,y coordinates
    */
	polarToCartesian: function(theta, radius) {
		var returnFloat = [0.0 , 0.0];
		returnFloat[0] = radius * Math.cos(theta);
		returnFloat[1] = radius * Math.sin(theta);
		return returnFloat;
	},

	/**
    * Calculates angle, radius for x,y coordinates based on the polar-cartesian function
    * @param x (float)
    * @param y (float)
    * @returns array of angle, radius 
    */
	cartesianToPolar: function(x, y) {
		var returnFloat = [0.0 , 0.0];
		returnFloat[0] = Math.atan2( y , x );
		returnFloat[1] = Math.sqrt( x * x + y * y );
		return returnFloat;
	}
};