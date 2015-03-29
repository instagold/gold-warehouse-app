app.models.formWithdraw.formWithdrawForm = (function() {
    var viewModel = kendo.observable({
        model: {
            amtWithdrawn: 0,
        },
        submit: function() {},
        cancel: function() {}
    });
    return viewModel;
})();