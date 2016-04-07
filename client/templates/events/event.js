Template.event.helpers({
    isOrderSubmitted: function () {
        var orderId = Orders.findOne({userId: Meteor.userId(), eventId: this._id});
        return !!orderId;
    }
});
Template.event.events({
    'click #submit-order': function (e) {
        e.preventDefault();

        Meteor.call('insertOrder', this._id, function (error, result) {
            if (error) {
                return throwError(error.reason);
            }
            if (result) {
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