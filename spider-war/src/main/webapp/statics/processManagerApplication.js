/**
 * 流程管理应用入口
 */
define([
         'backbone',
         'underscore',
         'core/layout',
         'core/panel',
         'app/topNav',
         'app/content',
         'text!./ftl/footer.html',
         'core/accordion',
         'text!./ftl/accNav.html',
         'core/context'
     ],function(Backbone,_,Layout,Panel,TopNav,Content,footer,Accordion,actemplate,ZSQ){
	var controller  = Backbone.Router.extend({
		initialize:function(){
			this.initComponent();
		},
		/*
		 * 初始化页面组件 
		 */
		initComponent:function(){
			var config = {el:'#processManagerCenter',showEast:false};
			//
			var panel =  new Layout(config);
			panel.render();
			var topNav = new TopNav();
			panel.addBorderComponent('north',topNav);
			panel.addBorderComponent('center',new Content());
			var acConfig = {template:actemplate};
			var ac = new Accordion(acConfig);
			var p3 = new Panel({title:'导航栏',cls:'panel-info',usePanel:true,view:ac});
			panel.addBorderComponent('west',p3);
			//panel.addBorderComponent('east',new Panel({title:'我的附导航',cls:'panel-info'}));
			panel.addBorderComponent('south',new Panel({template:footer}));
		}
	});
	
	var Application = new controller();
	Backbone.history.start();
	return Application;
});