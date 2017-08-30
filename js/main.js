var d3 = require('d3');

//Public members
var App = {};

var this_js_script = $('script[src*=App]');
    var my_var_1 = this_js_script.attr('data-my_var_1');   
        if (typeof my_var_1 === "undefined" ) 
        {
                var my_var_1 = 'some_default_value';
        }
    var my_var_2 = this_js_script.attr('data-my_var_2'); 
//end

App.init = function(options){ 
    
    
    //Views
    var Main = require('./views/main');
    //var NavBar = require('./views/navBar');
    
    App.views = {};
    App.views.vis = require('./views/process.vis.js');
    
    App.views.main = new Main();
    App.views.main.setElement('#sidebar').render();
    
    //App.views.navBar = new NavBar();
    //App.views.navBar.setElement('#navbar').render();
    
    App.views.vis.selector('#vis');
    
    d3.json("./data/" + my_var_1 + ".json", function(error, nodes) {
        if (error) return console.warn(my_var_1 + ".json");
        
        d3.json(my_var_2, function(error, links) {
            if (error) return console.warn(my_var_2);
            
            App.views.vis.init(nodes, links);
        });
        
    });
};

module.exports = App;