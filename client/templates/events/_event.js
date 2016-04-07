Template._event.helpers({
    isOrderSubmitted: function () {
        var orderId = Orders.findOne({userId: Meteor.userId(), eventId: this._id});
        return !!orderId;
    }
});
Template._event.events({
    'click #submit-order': function (e) {
        e.preventDefault();

        Meteor.call('insertOrder', this._id, function (error, result) {
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