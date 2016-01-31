/*
 * 模拟数据表格
 */
define(['backbone','jquery','underscore','jqgrid/js/i18n/grid.locale-cn','jqgrid/js/grid.inlinedit',
        'css!jqgrid/css/ui.jqgrid-bootstrap'
        ],function(Backbone,$,_){
	
	    var lastSelection;
	    
		function editRow(id) {
	        if (id && id !== lastSelection) {
	            var grid = $("#test");
	            grid.jqGrid('restoreRow',lastSelection);
	            grid.jqGrid('editRow',id, {keys:true, focusField: 4});
	            lastSelection = id;
	        }
	    }
	
		
		var grid = Backbone.View.extend({
				render:function(){
					this.$el.css({overflow:'hidden'})
					this.$el.append('<table id="test"></table><div id="jqGridPager"></div>')
					var that = this;
					this._grid = $('#test',this.$el).jqGrid({
		                url: 'repository/deployments',
		                mtype: "GET",
						styleUI : 'Bootstrap',
		                datatype: "jsonp",
		                loadonce:true,
		                colModel: [
		                    { label: '编号', name: 'id', key: true},
		                    { label: '链接', name: 'url'},
		                    { label: '类别', name: 'category'},
		                    { label: '名称', name: 'name',editable: true, edittype: "text"},
		                    { label: '发布时间', name: 'deploymentTime'},
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
		                ,ondblClickRow: editRow
		                ,jsonReader:{
		                	 id:'id',
		                	 root: "data", 
		                     page: "page", 
		                     total: "total", 
		                     records: "records"
		                },
					   gridview:false
		            });
			
					
			
			/*this._grid.navGrid('#jqGridPager',
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
	                });*/
		},
		reSize:function(){
			this._grid.setGridWidth(this.$el.innerWidth());	
		}
	})
	return grid;
});