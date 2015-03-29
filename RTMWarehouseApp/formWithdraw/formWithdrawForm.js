app.models.formWithdraw.formWithdrawForm = (function() {
    var viewModel = kendo.observable({
        model: {
            amtWithdrawn: undefined,
        },
        submit: function() {},
        cancel: function() {}
    });
    return viewModel;
})();