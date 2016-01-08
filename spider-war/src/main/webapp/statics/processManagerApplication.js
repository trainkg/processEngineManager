/**
 * 流程管理应用入口
 */
require([
         'backbone',
         'underscore',
         'core/layout'
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
			var panel =  new Window(config);
			
			var panel1 =  new Window();
			var panel2 =  new Window({
				southHt:50,
				eastWt:100,
				showNorth:false,
				showWest:false
			});
			panel.render();
			panel.addBorderComponent('center',panel2);
//			panel.addBorderComponent('east',panel2);
		}
	});
	
	new controller();
	Backbone.history.start();
});