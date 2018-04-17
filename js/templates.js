var glob = ('undefined' === typeof window) ? global : window,

Handlebars = glob.Handlebars || require('handlebars');

this["Templates"] = this["Templates"] || {};

this["Templates"]["main"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!-- Page Content -->\n<div class=\"container main\">\n    \n    \n    <div class=\"row\">\n        \n        <div class=\"col-md-2\">\n            \n            <div class=\"row\">\n            \n                <div class=\"col-md-12 title\" style=\"margin-top:20px;\">Find a Gene</div>\n            \n                <div class=\"col-md-12\" style=\"margin-top:10px;\">\n                    <input type=\"text\" class=\"form-control\" placeholder=\"Search gene by name...\" style=\"font-size:11px\">\n                    <ul class=\"list-group results\"></ul>\n                </div>\n\n\n                <div class=\"col-md-12 miniTitle\" style=\"margin-top:20px;\">\n                    Legend\n                </div>\n\n                <div class=\"col-md-6 legendText\">\n                    <strong>Color</strong> shows gene regulation\n                </div>\n\n                <div class=\"col-md-6\">\n                    <svg width=\"70\" height=\"65\">\n                        <rect x=\"0\" y=\"10\" width=\"25\" height=\"7\" fill=\"#2171b5\"></rect>\n                        <rect x=\"0\" y=\"25\" width=\"25\" height=\"7\" fill=\"#BECCAE\"></rect>\n                        <rect x=\"0\" y=\"40\" width=\"25\" height=\"7\" fill=\"#C72D0A\"></rect>\n\n                        <text x=\"30\" y=\"17\" class=\"legendText\">Up</text>\n                        <text x=\"30\" y=\"32\" class=\"legendText\">None</text>\n                        <text x=\"30\" y=\"48\" class=\"legendText\">Down</text>\n                    </svg>\n                </div>\n\n                <div class=\"col-md-6 legendText\" style=\"padding-right:0px\">\n                    <strong>Dark Borders</strong> show mutations\n                </div>\n\n                <div class=\"col-md-6 legendText\">\n                    <svg width=\"70\" height=\"50\">\n                        <circle cx=\"25\" cy=\"18\" fill=\"none\" r=\"16\" stroke-width=\"1.2\" stroke=\"#2c3e50\"></circle>\n                    </svg>\n                </div>\n\n                <div class=\"col-md-6 legendText\">\n                    <strong>Size</strong> shows Log2 fold change\n                </div>\n\n                <div class=\"col-md-6 legendText\">\n                    <svg width=\"70\" height=\"50\">\n                        <circle cx=\"25\" cy=\"20\" style=\"stroke-dasharray: 2 2\" fill=\"none\" r=\"16\" stroke-width=\"1\" stroke=\"#5f6062\"></circle>\n                        <circle cx=\"25\" cy=\"30\" style=\"stroke-dasharray: 2 2\" fill=\"none\" r=\"6\" stroke-width=\"1\" stroke=\"#5f6062\"></circle>\n                    </svg>\n                </div>\n\n                <div class=\"col-md-12\">\n                    <hr>\n                </div>\n            \n            </div>\n            \n            \n            <div class=\"row tip\" style=\"margin-top:20px;\">\n            </div>\n            \n            \n        </div>\n        \n        <div class=\"col-md-10\">\n            <div id=\"vis\" class=\"vis\"></div>\n        </div> \n    </div>\n    \n</div>";
},"useData":true});

this["Templates"]["result"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"list-group-item\"><span class=\"title\">"
    + alias4(((helper = (helper = helpers.geneID || (depth0 != null ? depth0.geneID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"geneID","hash":{},"data":data}) : helper)))
    + "</span><br><span>"
    + alias4(((helper = (helper = helpers.process || (depth0 != null ? depth0.process : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"process","hash":{},"data":data}) : helper)))
    + "</span></li>";
},"useData":true});

this["Templates"]["tooltip"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"row infos\">\n<div class=\"col-md-5 miniTitle greyish\">\n    chr\n</div>                \n<div class=\"col-md-7 info\">"
    + container.escapeExpression(((helper = (helper = helpers.chr || (depth0 != null ? depth0.chr : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"chr","hash":{},"data":data}) : helper)))
    + "</div>\n</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"row infos\">\n<div class=\"col-md-5 miniTitle greyish\">\n    "
    + alias4(((helper = (helper = helpers.geneID_a1_name || (depth0 != null ? depth0.geneID_a1_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"geneID_a1_name","hash":{},"data":data}) : helper)))
    + "\n</div>                \n<div class=\"col-md-7 info\">"
    + alias4(((helper = (helper = helpers.geneID_a1 || (depth0 != null ? depth0.geneID_a1 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"geneID_a1","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"row infos\">\n<div class=\"col-md-5 miniTitle greyish\">\n    "
    + alias4(((helper = (helper = helpers.geneID_a2_name || (depth0 != null ? depth0.geneID_a2_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"geneID_a2_name","hash":{},"data":data}) : helper)))
    + "\n</div>                \n<div class=\"col-md-7 info\">"
    + alias4(((helper = (helper = helpers.geneID_a2 || (depth0 != null ? depth0.geneID_a2 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"geneID_a2","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"row infos\">\n\n<div class=\"col-md-5 miniTitle greyish\">\n    "
    + alias4(((helper = (helper = helpers.geneID_a3_name || (depth0 != null ? depth0.geneID_a3_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"geneID_a3_name","hash":{},"data":data}) : helper)))
    + "\n</div>                \n<div class=\"col-md-7 info\">"
    + alias4(((helper = (helper = helpers.geneID_a3 || (depth0 != null ? depth0.geneID_a3 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"geneID_a3","hash":{},"data":data}) : helper)))
    + "</div>\n</div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "    "
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "<br>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-md-12 title\">"
    + alias4(((helper = (helper = helpers.geneID || (depth0 != null ? depth0.geneID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"geneID","hash":{},"data":data}) : helper)))
    + "</div>\n\n<div class=\"col-md-12 gene_name greyish\">("
    + alias4(((helper = (helper = helpers.gene_name || (depth0 != null ? depth0.gene_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"gene_name","hash":{},"data":data}) : helper)))
    + ")</div>\n\n<div class=\"col-md-12 process\">"
    + alias4(((helper = (helper = helpers.process || (depth0 != null ? depth0.process : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"process","hash":{},"data":data}) : helper)))
    + "</div>\n\n<div class=\"col-md-12 function greyish\">"
    + alias4(((helper = (helper = helpers.gene_function || (depth0 != null ? depth0.gene_function : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"gene_function","hash":{},"data":data}) : helper)))
    + "</div>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.chr : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.geneID_a1 : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.geneID_a2 : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.geneID_a3 : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<div class=\"row infos\">\n<div class=\"col-md-12 miniTitle sample\">"
    + alias4(((helper = (helper = helpers.sampleID || (depth0 != null ? depth0.sampleID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sampleID","hash":{},"data":data}) : helper)))
    + "</div>\n</div>\n\n<div id=\"wrapUp\">  \n\n<div class=\"row infos\">\n<div class=\"col-md-6 miniTitle\">\n    Log2 FC\n</div>\n   \n<div class=\"col-md-6 info\">"
    + alias4(((helper = (helper = helpers.log2 || (depth0 != null ? depth0.log2 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"log2","hash":{},"data":data}) : helper)))
    + "</div>\n</div>\n\n<div class=\"row infos\">\n<div class=\"col-md-6 miniTitle\">\n    Pvalue\n</div>\n                \n<div class=\"col-md-6 info\">"
    + alias4(((helper = (helper = helpers.pvalue || (depth0 != null ? depth0.pvalue : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pvalue","hash":{},"data":data}) : helper)))
    + "</div>\n</div>\n\n</div>\n<div class=\"row infos\">\n<div class=\"col-md-12 miniTitle\">\n    mutation\n</div>\n</div>\n<div class=\"col-md-12 mutation\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.mutation : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n</div>";
},"useData":true});

if (typeof exports === 'object' && exports) {module.exports = this["Templates"];}