app.models.formView.formViewForm = (function() {
    var viewModel = kendo.observable({
        model: {
            skeyIssuer: undefined,
            pkeyIssuer: undefined,
            uriRipple: function (){
                return "ripple:" + app.models.formView.formViewForm.get("pkeyIssuer");
            },
            scanVisible: false,
        },
        submit: function() {
            if ($("#session").text() == "Logout"){
                alert("logout code goes here for " + app.models.formView.formViewForm.get("skeyIssuer"));
                // use ripple-lib to terminate session
                app.models.formView.formViewForm.set("skeyIssuer", undefined);
                app.models.formView.formViewForm.set("pkeyIssuer", undefined);
                $("#skey").val(undefined);
                $("#session").text("Login");      
                //app.models.formView.formViewForm.set("scanVisible", !app.models.formView.formViewForm.get("scanVisible"));
            }else{
                alert("login code goes here for " + app.models.formView.formViewForm.get("skeyIssuer"));
                // use ripple-lib to login using skeyIssuer
                // discover pkeyIssuer from session
                app.models.formView.formViewForm.set("pkeyIssuer", "rAAAAAAABBBBBBBCCCCCCCDDDDDDDEEEEE");
                $("#session").text("Logout");
                //app.models.formView.formViewForm.set("scanVisible", !app.models.formView.formViewForm.get("scanVisible"));
                alert("uri="+app.models.formView.formViewForm.model.uriRipple());
                app.navigate("#main");
            }
        },
        doscan: function() {
            var that = this;
            if (window.navigator.simulator === true) {
                //alert("Not Supported in Simulator.");
                $("#skey").val("sAAAAAAABBBBBBBCCCCCCCDDDDDDD");
                app.models.formView.formViewForm.set("skeyIssuer", "sAAAAAAABBBBBBBCCCCCCCDDDDDDD");                
                app.models.formView.formViewForm.set("pkeyIssuer", "rAAAAAAABBBBBBBCCCCCCCDDDDDDDEEEEE"); 
            }
            else {
                cordova.plugins.barcodeScanner.scan(
                    function(result) {
                        if (!result.cancelled) {
                            //var regex = /(r[0-9a-zA-Z]{33,33}$)/i;  // public key format
                            var regex = /(s[0-9a-zA-Z]{28,28}$)/i;    // secret key format
                            var matches = result.text.match(regex);                            
                            if (matches.length > 0) {
                                $("#skey").val(matches[0]);
                                app.models.formView.formViewForm.set("skeyIssuer", matches[0]); 
                            }
                        }
                    }, 
                    function(error) {
                        //safelog("Scanning failed: " + error);
                    });
            }
    }

        
    });
    
    //kendo.bind($("#formViewForm"), viewModel);
    return viewModel;
})();