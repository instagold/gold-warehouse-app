app.models.formIssueAgainstGoldDeposit.formIssueAgainstGoldDepositForm = (function() {
    var viewModel = kendo.observable({
        model: {
            amtTendered: undefined,
            fboAccount: undefined,
        },
        submit: function() {},
        cancel: function() {}
    });
    return viewModel;
})();