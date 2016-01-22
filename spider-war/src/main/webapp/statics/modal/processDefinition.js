/*
 * Activiti Process Definition Model 
 */
defined(['./core/context','backbone','underscore'],function(ZSQ,Backbone,_){
	
	var pdm = ZSQ.modal.processDefinition; 
	
	pdm.definitions = Backbone.Modal.extend({
		url:'service/repository/process-definitions'
	});
	
	return ZSQ;
})