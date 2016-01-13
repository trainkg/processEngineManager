/**
 * 流程管理应用入口
 */
require([
         'backbone',
         'underscore',
         'core/layout',
         'core/panel',
         'app/applicationTopNav',
         'app/content'
         
     ],function(Backbone,_,Window,Panel,TopNav,Content){
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
			var topNav = new TopNav();
			panel.addBorderComponent('north',topNav);
			panel.addBorderComponent('center',new Content());
			panel.addBorderComponent('west',new Panel());
		}
	});
	
	new controller();
	Backbone.history.start();
});