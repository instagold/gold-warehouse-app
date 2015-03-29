'use strict';

app.models.dataListView = (function() {
    return {};
})();
app.models.dataListView.dataListViewList = (function() {

    var dataProvider = app.data.defaultprovider;

    var source = new kendo.data.DataSource({

        type: 'everlive',
        transport: {

            // Required by Backend Services
            typeName: 'counties',
            dataProvider: dataProvider

        },

        schema: {
            model: {
                fields: {

                    TexasCounties: {
                        field: 'Texas Counties',
                        defaultValue: ''
                    },
                }

                ,
                icon: function() {
                    var i = 'globe';
                    return kendo.format('km-icon km-{0}', i);
                }

            }
        },

    });

    var viewModel = kendo.observable({
        dataSource: source,

        currentItem: null,

        itemClick: function(e) {

            app.mobileApp.navigate('#dataListView/details.html?uid=' + e.dataItem.uid);
        },
        detailsShow: function(e) {
            var item = e.view.params.uid,
                itemModel = source.getByUid(item);

            viewModel.set('currentItem', itemModel);

        }
    });

    return {
        viewModel: viewModel
    };
})();