/**
 * 流程管理应用入口
 */
define([
         'backbone',
         'underscore',
         'core/layout',
         'core/panel',
         'app/applicationTopNav',
         'app/content',
         'text!./ftl/footer.html'
     ],function(Backbone,_,Window,Panel,TopNav,Content,footer){
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
			panel.render();
			var topNav = new TopNav();
			panel.addBorderComponent('north',topNav);
			panel.addBorderComponent('center',new Content());
			panel.addBorderComponent('west',new Panel({title:'test'}));
			panel.addBorderComponent('east',new Panel({title:'我的附导航'}));
			panel.addBorderComponent('south',new Panel({template:footer}));
		}
	});
	
	new controller();
	Backbone.history.start();
});