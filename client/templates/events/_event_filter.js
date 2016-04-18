Template._eventFilter.events({
    'change #type': function () {
        var type = $('#type option:selected').val();

        var currentRoute = Router.current().route.getName();
        var currentParams = Router.current().params;
        
        if (type) Router.go(currentRoute, currentParams, {query: 'type=' + type});
        else Router.go(currentRoute, currentParams);
    }
});

Template._eventFilter.helpers({
    select: function (type) {
        if (_.contains(getTypesFromQuery(), type)) {
            return 'selected';
        }
        return '';
    }
});