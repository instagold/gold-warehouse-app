app.models.formView.formViewForm = (function() {
    var viewModel = kendo.observable({
        model: {
            skeyIssuer: undefined,
        },
        submit: function() {
            alert("logint");
        },
        doscan: function() {
            var that = this;
            if (window.navigator.simulator === true) {
                alert("Not Supported in Simulator.");
            }
            else {
                cordova.plugins.barcodeScanner.scan(
                    function(result) {
                        if (!result.cancelled) {
                            var regex = /(r[0-9a-zA-Z]{33,33}$)/i;
                            var matches = result.text.match(regex);
                            alert(matches);
                            if (matches.length > 0) {
                                //safelog("set merchant: "+matches[0]);
                                that._setMerchantAccount(matches[0]); 
                            }
                        }
                    }, 
                    function(error) {
                        //safelog("Scanning failed: " + error);
                    });
            }
    }

        
    });
    return viewModel;
})();