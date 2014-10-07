d3.spinner
==========

![Example Spinner](https://raw.githubusercontent.com/sebastian-meier/d3.spinner/master/thumbnail.png)

**Loading Spinner for d3 projects**

## Usage

```
d3.spinner({
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
    //Container e.g. d3.select("body")
    element : false,
    //radius of the spinner, this is set automatically through width and height
    radius : 0,
    //base css class, if you change this, you also need to change the css classes
    cls : 'spinner-step'
});
```

For more information checkout the example

## License

My code is published under the MIT/GPL.

* http://en.wikipedia.org/wiki/MIT_License
* http://en.wikipedia.org/wiki/GNU_General_Public_License

If you make enhancements or code changes i would love to know so i can reshare your findings.