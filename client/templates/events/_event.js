Template._event.helpers({
    isOrderSubmitted: function () {
        return !!Meteor.users.findOne({_id: Meteor.userId(), eventOrders: {$elemMatch: {eventId: this._id}}});
    },
    ordersCount: function () {
        return Meteor.users.find({eventOrders: {$elemMatch: {eventId: this._id}}}).count();
    },
    ordersAcceptedCount: function () {
        return Meteor.users.find({eventOrders: {$elemMatch: {eventId: this._id, orderStatus: orderStatuses.accepted}}}).count();
    },
    ordersRejectedCount: function () {
        return Meteor.users.find({eventOrders: {$elemMatch: {eventId: this._id, orderStatus: orderStatuses.rejected}}}).count();
    },
    ordersExpectsCount: function () {
        return Meteor.users.find({eventOrders: {$elemMatch: {eventId: this._id, orderStatus: orderStatuses.expects}}}).count();
    },
});
Template._event.events({
    'click #submit-order': function (e) {
        e.preventDefault();

        var event = {
            _id: this._id,
            name: this.eventName
        };
        Meteor.call('insertOrder', event, function (error, result) {
            if (error) {
                return throwError(error.reason);
            }
            if (result) {
                if (result.isMyEvent) alert('Вы не можете подать заявку на свое событие');
                if (result.orderExists) alert('Заявка на это событие уже подана');
                //else alert('Заявка успешно подана');
            }
        });
    },
    'click #cancel-order': function (e) {
        e.preventDefault();

        Meteor.call('removeOrder', this._id, function (error, result) {
            if (error)return throwError(error.reason);
            //else alert('Заявка отменена');
        });
    }
});