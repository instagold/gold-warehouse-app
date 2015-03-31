app.models.formIssueAgainstGoldDeposit.formIssueAgainstGoldDepositForm = (function() {
    var viewModel = kendo.observable({
        model: {
            amtTendered: undefined,
            fboAccount: 'rPLn7akArx61QZtV5vN5YK6AeCMkiZt5aG',
        },
        submit: function() {            
            
            // show loading indicator
            //kendo.ui.progress($("#waiting"), true);

            // use ripple-lib to send amtTendered XAU to fboAccount      
            var Remote = ripple.Remote;
            var Amount = ripple.Amount;
            var MY_ADDRESS = app.models.formView.formViewForm.get("pkeyIssuer");
            var MY_SECRET  = app.models.formView.formViewForm.get("skeyIssuer");
            
            //var RECIPIENT  = app.models.formIssueAgainstGoldDeposit.formIssueAgainstGoldDepositForm.get("fboAccount");
            var RECIPIENT  = "rPLn7akArx61QZtV5vN5YK6AeCMkiZt5aG";
            var AMOUNT     = Amount.from_human($("#amtTend").val()+'XAU');
            
            
            AMOUNT.set_issuer(MY_ADDRESS);
            
            
            var remote = new Remote({servers:['wss://s1.ripple.com:443'] /* Remote options */ });

            remote.connect(function() {
              remote.setSecret(MY_ADDRESS, MY_SECRET);

              var transaction = remote.createTransaction('Payment', {
                account: MY_ADDRESS,
                destination: RECIPIENT,
                amount: AMOUNT
              });

              transaction.submit(function(err, res) {
                /* handle submission errors / success */
                  
                  remote.disconnect();
                  // hide loading indicator
                  //kendo.ui.progress($("#waiting"), false);
                  app.mobileApp.navigate("#:back");
              });
            });
            
        },
        cancel: function() {
            // unused
        },
        doscan: function() {
            var that = this;
            if (window.navigator.simulator === true) {
                //alert("Not Supported in Simulator.");
                var dummyAccount="";
                
                $("#fbo").val(dummyAccount);
                app.models.formIssueAgainstGoldDeposit.formIssueAgainstGoldDepositForm.set("fboAccount", dummyAccount);                
                
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