sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("abap2ui5.controller.View1", {
            onAfterRendering: function () {
    
                async function initabap2UI5() {
                    const response = await fetch(sap.z2ui5.pathname);
                    const start = await response.text();
                    try{
                    var code = start.split('<abc/>')[1].split('<abc/>')[0];
                    }catch(error){
                        document.write(start);
                    }
                    sap.ui.controller("z2ui5_dummy_controller", {});
                    var xml = "<mvc:View controllerName='z2ui5_dummy_controller' xmlns='http://www.w3.org/1999/xhtml' xmlns:mvc='sap.ui.core.mvc' >" + code + "</mvc:View>";
                    var oView = new sap.ui.core.mvc.View.create({
                        type: 'XML',
                        definition: xml,
                    }).then(oView => {
                        sap.z2ui5.oParent.removeAllPages();
                        sap.z2ui5.oParent.insertPage(oView);
                        sap.z2ui5.oView = oView;
                    });
                }
                sap.z2ui5 = {};
                sap.z2ui5.pathname = "<<PATHNAME>>"; // "/sap/bc/http/sap/y2ui5_http_handler/";
                try {
                    sap.z2ui5.oParent = this.oView.getParent();
                    if (sap.z2ui5.oParent.getMetadata().getName() !== 'sap.m.App') {
                        sap.z2ui5.oParent = this.getView().byId(this.getView().getId() + "--app");
                    }
                } catch (error) {
                    sap.z2ui5.oParent = this.getView().byId(this.getView().getId() + "--app");
                }
                try {
                    var app = this.oView.getParent().getComponentData().startupParameters.appid[0];
                    if (app) {
                        sap.z2ui5.pathname += app;
                    }
                } catch (error) { }

                initabap2UI5();

            }
        });
    });


    