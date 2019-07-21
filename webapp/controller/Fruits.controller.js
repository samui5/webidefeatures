sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
	"use strict";
	return Controller.extend("oft.demo.FruitsApp.controller.Fruits", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf oft.demo.FruitsApp.view.Fruits
		 */
		onInit: function () {
			this.handleNavigationWithContext();
		},
		/**
		 *@memberOf 
		 */
		handleNavigationWithContext: function () {
			var that = this;
			var entitySet;
			var sRouteName;

			function _onBindingChange(oEvent) {
				// No data for the binding
				if (!that.getView().getBindingContext()) {
					//Need to insert default fallback route to load when requested route is not found.
					that.getOwnerComponent().getRouter().getTargets().display("");
				}
			}

			function _onRouteMatched(oEvent) {
				debugger;
				var oArgs, oView;
				oArgs = oEvent.getParameter("arguments");
				oView = that.getView();
				// var sKeysPath = Object.keys(oArgs).map(function (key) {
					
				// 	return key + "=" + "'" + oProp + "'" : oProp);
				// }).join(",");

				oView.bindElement({
					path: entitySet + "('" + JSON.parse(decodeURIComponent(oArgs["SupplierId"])) + "')",
					urlParameters: {
						expand: 'ToSupplierFruits'	
					},
					events: {
						change: _onBindingChange.bind(that),
						dataRequested: function () {
							oView.setBusy(true);
						},
						dataReceived: function () {
							oView.setBusy(false);
						}
					}
				});
			}

			if (that.getOwnerComponent().getRouter) {
				var oRouter = that.getOwnerComponent().getRouter();
				var oManifest = this.getOwnerComponent().getMetadata().getManifest();
				var content = that.getView().getContent();
				if (content) {
					var oNavigation = oManifest["sap.ui5"].routing.additionalData;
					var oContext = oNavigation[that.getView().getViewName()];
					sRouteName = oContext.routeName;
					entitySet = oContext.entitySet;
					oRouter.getRoute(sRouteName).attachMatched(_onRouteMatched, that);
				}
			}
		}
	});
});