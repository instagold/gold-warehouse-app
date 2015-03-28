app.models.formView.formViewForm = (function() {
    var viewModel = kendo.observable({
        model: {
            skeyIssuer: undefined,
        },
        submit: function() {},
        cancel: function() {}
    });
    return viewModel;
})();