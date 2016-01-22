/*
 * 模拟数据表格
 */
define(['backbone','jquery','underscore','jqgrid/js/i18n/grid.locale-cn','jqgrid/js/grid.formedit','css!jqgrid/css/ui.jqgrid-bootstrap'],function(Backbone,$,_){
	
	var grid = Backbone.View.extend({
		render:function(){
			this.$el.css({overflow:'hidden'})
			this.$el.append('<table id="test"></table><div id="jqGridPager"></div>')
			var that = this;
			this._grid = $('#test',this.$el).jqGrid({
                url: 'http://trirand.com/blog/phpjqgrid/examples/jsonp/getjsonp.php?callback=?&qwery=longorders',
                mtype: "GET",
				styleUI : 'Bootstrap',
                datatype: "jsonp",
                colModel: [
                    { label: 'OrderID', name: 'OrderID', key: true, width: 75 },
                    { label: 'Customer ID', name: 'CustomerID', width: 150 },
                    { label: 'Order Date', name: 'OrderDate', width: 150 },
                    { label: 'Freight', name: 'Freight', width: 150 },
                    { label:'Ship Name', name: 'ShipName', width: 150 }
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
	                    }
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