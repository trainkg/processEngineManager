/*
 * Activiti Process Definition Model 
 */
define(['core/context','backbone','underscore'],function(ZSQ,Backbone,_){
	if(!ZSQ.modal.processDefinition){ZSQ.modal.processDefinition = {}}
	var pdm = ZSQ.modal.processDefinition; 
	
	pdm.definitions = Backbone.Model.extend({
		url:'/repository/process-definitions'
	});
	
	var modal = new pdm.definitions();
	modal.fetch();
	modal.on("sync",function(){
		console.log(this.toJSON());
	})
	return ZSQ;
})