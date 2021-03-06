/*
 * 模拟数据表格
 */
define(['backbone','jquery','underscore','jqgrid/js/i18n/grid.locale-cn','jqgrid/js/grid.formedit',
        'css!jqgrid/css/ui.jqgrid-bootstrap'
        //'./modal/processDefinition'
        ],function(Backbone,$,_){
	var grid = Backbone.View.extend({
				events:{
					"click.zsq.api button.start-process":"startProcess"
				},
				startProcess:function(e){
					var $target = $(e.currentTarget);
					var rowId = $target.data('rowid');
					var pd = this._grid.jqGrid('getRowData',rowId);
					
					var data = {
							   "processDefinitionId":rowId,
							   "businessKey":"myBusinessKey",
							   "variables": [
							      {
							        "name":"myVar",
							        "value":"This is a variable",
							      }
							   ]
							};
					
					$.ajax({
						url:'runtime/process-instances',
						type:'POST',
						contentType:'application/json',
						dataType:'json',
						data:JSON.stringify(data),
						success:function(data){
							console.log(data);
						}
					});
				},
				render:function(){
					this.$el.css({overflow:'hidden'})
					this.$el.append('<table id="test"></table><div id="jqGridPager"></div>')
					var that = this;
					this._grid = $('#test',this.$el).jqGrid({
		                url: '/repository/process-definitions?suspended=false',
		                postData:{a:1},
		                mtype: "GET",
						styleUI : 'Bootstrap',
		                datatype: "jsonp",
		                loadonce:true,
		                colModel: [
		                    { label: '序号', name: 'id', key: true},
		                    { label: '链接', name: 'url'},
		                    { label: '编号', name: 'key'},
		                    { label: '名称', name: 'name'},
		                    { label: '描述', name: 'description'},
		                    { label: '操作列表',sortable:false, formatter:function(cellValue, options, rowObject){ 
								  var buttons  = '<div class="btn-group btn-group-xs" role="group" aria-label="...">'+
								  '<button title="发起流程" data-rowId="'+options.rowId+'" type="button" class="start-process btn btn-default"><span class="glyphicon glyphicon-road"></span></button>'+
								  /*'<button title="修改" type="button" class="btn btn-default"><span class="glyphicon glyphicon-repeat"></span></button>'+
								  '<button title="删除" type="button" class="btn btn-default"><span class="glyphicon glyphicon-list-alt"></span></button>'+*/
								  '</div>';
								  return buttons;
		                    }}
		                ],
						viewrecords: true,
		                height: that.$el.innerHeight() - 75,
		                //width:that.$el.innerWidth(),
		                //forceFit:true,
		                autowidth:true,
		                multiboxonly:true,
		                multiselect:true,
		                rowNum: 20
		                ,pager: "#jqGridPager"
		                ,jsonReader:{
		                	 root: "data", 
		                     page: "page", 
		                     total: "total", 
		                     records: "records"
		                } 
		            });
			
			console.log(this._grid);
			
			this._grid.navGrid('#jqGridPager',
	                // the buttons to appear on the toolbar of the grid
	                { edit: true, add: true, del: true, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
	                // options for the Edit Dialog
	                {
	                    editCaption: "The Edit Dialog",
	                    recreateForm: true,
						checkOnUpdate : true,
						checkOnSubmit : true,
	                    closeAfterEdit: true,
	                    errorTextFormat: function (data) {
	                        return 'Error: ' + data.responseText
	                    } 
	                	,jqModal:false
	                },
	                // options for the Add Dialog
	                {
	                    closeAfterAdd: true,
	                    recreateForm: true,
	                    errorTextFormat: function (data) {
	                        return 'Error: ' + data.responseText
	                    }
	                },
	                // options for the Delete Dailog
	                {
	                    errorTextFormat: function (data) {
	                        return 'Error: ' + data.responseText
	                    },
	                    jqModal:false
	                });
			    
			$(document).on('zsq.border.resize',function(){
				if(that._grid){
					that._grid.setGridWidth(that.$el.innerWidth());	
				}
			})
		}
	})
	return grid;
});