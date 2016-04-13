Template._event.helpers({
    isOrderSubmitted: function () {
        return !!Orders.findOne({userId: Meteor.userId(), eventId: this._id});
    },
    ordersCount: function () {
        return Orders.find({eventId: this._id}).count();
    },
    ordersAcceptedCount: function () {
        return Orders.find({eventId: this._id, status: orderStatuses.accepted}).count();
    },
    ordersRejectedCount: function () {
        return Orders.find({eventId: this._id, status: orderStatuses.rejected}).count();
    },
    ordersExpectsCount: function () {
        return Orders.find({eventId: this._id, status: orderStatuses.expects}).count();
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