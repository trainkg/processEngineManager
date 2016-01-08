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
			var panel =  new Window(config);
			
			var panel1 =  new Window();
			var panel2 =  new Window({
					resize : false,
					type : 'border', // border | flow | flexgrid | grid
					vgap : 4,		 
					hgap : 4,		 
					westWt:20,
					southHt:50,
					eastWt:20,
					showNorth:false,
					showWest:false
			});
			panel.render();
			panel.addBorderComponent('center',panel1);
			panel.addBorderComponent('east',panel2);
//			panel.addBorderComponent('south',panel3);
//			panel.addBorderComponent('west',panel4);
		}
	});
	
	new controller();
	Backbone.history.start();
});