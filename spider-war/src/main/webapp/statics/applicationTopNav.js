/*
 * 导航菜单
 */
define(['backbone','core/menuButton','core/menu','jquery','underscore','text!./ftl/tmenu.html','core/panel','text!./ftl/top.html'],function(Backbone,MenuButton,Menu,$,_,template,Panel,topFtl){
	var topNav = Backbone.View.extend({
		menuButton:null,
		initialize:function(){
			this.initNav();
			
			var $temples = $(template);
			var config = {buttonCls:'btn-xs btn-primary', 
			mouseoverToggle:true,		
			buttons:[{
				name:'测试一号BUTTON',
				menu:new Menu({
					template:$('#mm',$temples)[0].outerHTML,
					onClick:function(item){}
				})
				,split:true
			},
			{
				name:'测试二号BUTTON',
				menu:new Menu({
					template:$('#mm1',$temples)[0].outerHTML
				})
				,split:true
			}]};
			
			var menuButton = this.menuButton = new MenuButton(config);
			
			this._panel = new Panel({
				usePanel:false,
				decorate:{
					template:topFtl,
					contentSelect:'.process-main-top'
				},
				view:menuButton
			});
			
			$temples = null;
		},
		initNav:function(){
			
		},
		render:function(){
			this._panel.setElement(this.$el).render();
		}
	});
	return topNav;
});