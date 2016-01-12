/*
 * 导航菜单
 */
define(['backbone','core/menuButton','core/menu','jquery','underscore','text!./ftl/tmenu.html'],function(Backbone,MenuButton,Menu,$,_,template){
	var topNav = Backbone.View.extend({
		menuButton:null,
		initialize:function(){
			this.initNav();
		},
		initNav:function(){
			var $temples = $(template);
			var config = {buttons:[{
				name:'测试一号BUTTON',
				menu:new Menu({
					template:$('#mm',$temples)[0].outerHTML,
					onClick:function(item){}
				})
			},
			{
				name:'测试二号BUTTON',
				menu:new Menu({
					template:$('#mm1',$temples)[0].outerHTML
				})
			}]}
			this.menuButton = new MenuButton(config);
			$temples = null;
		},
		render:function(){
			this.menuButton.setElement(this.$el).render();
		}
	});
	return topNav;
});