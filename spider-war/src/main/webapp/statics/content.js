/*
 * TAB 内容区
 */
define(['backbone','jquery','underscore','core/tabs','text!app/ftl/tabs.html','./grids'],function(Backbone,$,_,Tabs,template,Grids){
	var cotent = Backbone.View.extend({
		initialize:function(){
			var props = {
				template:template
			};
			this.tabs = new Tabs(props);
		},
		render:function(){
			this.tabs.setElement(this.$el);
			this.tabs.render();
			this.tabs.addComponent({
				title:'App',
				closable:true
			},new Grids());
		}
	});
	return cotent;
});