Rain JS - v0.1
==============

JS widget for creating cascading layouts

Instructions
==============

Include jQuery - I'm working to remove jQuery as a dependency but unfortunately it's a requirement at the moment
Include `rain.min.js` in your html file
Add the following JS to your project

`RAIN.pour($("#droplets"), data);`

In RainJS, droplets are the individual elements that make up the layout

The first parameter `parent` is the parent element to add the "droplets" too, the second `data` is the array of data you want to render. Here's the default format:

    var data = [
        { image: {src: "images/cats/cat3.png", height: 267, alt: "test" }, description: "Lorem ipsum dolor sit amet" }`
    ]

The third parameter is `options`, which specifies a number of overridable options that you can configure

Options
=======

    template: "<img src=\"{{image.src}}\" height=\"{{image.height}}\" /><p>{{description}}</p>",

You can override the droplet template - the above is the default. Pass in your own variables using {{variablenName}}
The variable name corresponds to a property in your data object, i.e. {{image.src}} equates to image.src

    maxDroplets: 5,

The number of droplets to render per row

    guttering: 10,

The spacing between droplets
	
	dropletWidth: 200

The max width of a droplet