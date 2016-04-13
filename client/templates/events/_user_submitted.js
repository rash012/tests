Template._userSubmitted.events({
    'click #accept-order': function (e) {
        e.preventDefault();

        var userId = this._id;
        var eventId = Router.current().params._id;

        Meteor.call('acceptOrder', eventId, userId, function (error, result) {
            if (error) {
                return throwError(error.reason);
            }
        });
    },
    'click #reject-order': function (e) {
        e.preventDefault();

        var userId = this._id;
        var eventId = Router.current().params._id;

        Meteor.call('rejectOrder', eventId, userId, function (error, result) {
            if (error) {
                return throwError(error.reason);
            }
        });
    }
});
Template._userSubmitted.helpers({
    isExpects: function () {
        var userId = this._id;
        var eventId = Router.current().params._id;
        return getOrderStatus(eventId, userId) == orderStatuses.expects
    }
});