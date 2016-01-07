/**
 * 流程管理应用入口
 */
require([
         'backbone',
         'underscore',
         'core/panel'
     ],function(Backbone,_,Window){
	var controller  = Backbone.Router.extend({
		initialize:function(){
			this.initComponent();
		},
		/*
		 * 初始化页面组件 
		 */
		initComponent:function(){
			var config = {el:'#processManagerCenter',title:'测试'};
			this.panel =  new Window(config);
			this.panel.render();
		}
	});
	
	new controller();
	Backbone.history.start();
});