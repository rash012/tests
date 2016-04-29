Template._event.helpers({
    isOrderSubmitted: function () {
        return !!Orders.findOne({userId: Meteor.userId(), eventId: this._id});
    },
    shiftDisabledClass: function (eventId) {
        if(isEventShifted(eventId)) return 'disabled';
    },
    // ordersCount: function () {
    //     return getOrdersCount(this._id);
    // },
    // ordersAcceptedCount: function () {
    //     return getOrdersCount(this._id, orderStatuses.accepted);
    // },
    // ordersRejectedCount: function () {
    //     return getOrdersCount(this._id, orderStatuses.rejected);
    // },
    // ordersExpectsCount: function () {
    //     return Orders.find({eventId: this._id, status: orderStatuses.expects}).count();
    // },
});
Template._event.events({
    'click #submit-order': function (e) {
        e.preventDefault();

        var eventId = this._id;
        Meteor.call('insertOrder', eventId, function (error, result) {
            if (error) {
                return throwError(error.reason);
            }
            if (result) {
                if (result.isOwner) throwError('Вы не можете подать заявку на свое событие');
                if (result.orderExists) throwError('Заявка на это событие уже подана');
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
    },
});

Template._event.onRendered(function () {
    var eventId = this.data._id;
    $('#cancel-event').confirmation({
        btnOkLabel:'<i class="icon-ok-sign icon-white"></i> Да',
        btnCancelLabel:'<i class="icon-remove-sign"></i> Нет',
        placement: 'top',
        onConfirm: function () {
            Meteor.call('cancelEvent', eventId, function (error, result) {
                if (error)return throwError(error.reason);
                else Router.go('myCreatedEvents');
            });
        }
    })
});

