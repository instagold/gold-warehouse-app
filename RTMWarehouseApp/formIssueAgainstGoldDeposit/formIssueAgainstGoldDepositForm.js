app.models.formIssueAgainstGoldDeposit.formIssueAgainstGoldDepositForm = (function() {
    var viewModel = kendo.observable({
        model: {
            amtTendered: undefined,
            fboAccount: undefined,
        },
        submit: function() {
            //app.models.formIssueAgainstGoldDeposit.formIssueAgainstGoldDepositForm.get("amtTendered");
            //app.models.formIssueAgainstGoldDeposit.formIssueAgainstGoldDepositForm.get("fboAccount");
            // use ripple-lib to send amtTendered XAU to fboAccount
            
        },
        cancel: function() {
            // unused
        },
        doscan: function() {
            var that = this;
            if (window.navigator.simulator === true) {
                //alert("Not Supported in Simulator.");
                $("#fbo").val("rAAAAAAABBBBBBBCCCCCCCDDDDDDDEEEEE");
                app.models.formIssueAgainstGoldDeposit.formIssueAgainstGoldDepositForm.set("fboAccount", "rAAAAAAABBBBBBBCCCCCCCDDDDDDDEEEEE");                
                
            }
            else {
                cordova.plugins.barcodeScanner.scan(
                    function(result) {
                        if (!result.cancelled) {
                            var regex = /(r[0-9a-zA-Z]{33,33}$)/i;  // public key format
                            //var regex = /(s[0-9a-zA-Z]{28,28}$)/i;    // secret key format
                            var matches = result.text.match(regex);                            
                            if (matches.length > 0) {
                                $("#fbo").val(matches[0]);
                                app.models.formIssueAgainstGoldDeposit.formIssueAgainstGoldDepositForm.set("fboAccount", matches[0]); 
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