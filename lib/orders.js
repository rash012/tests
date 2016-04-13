Meteor.methods({
    insertOrder: function (event) {
        check(Meteor.userId(), NonEmptyString);
        check(event, {
            _id: NonEmptyString,
            name: NonEmptyString,
        });

        var user = Meteor.user();

        var isSubmitted = Meteor.users.findOne({_id: user._id, eventOrders: {$elemMatch: {eventId: event._id}}});
        if (isSubmitted) {
            return {
                eventId: event._id,
                orderExists: true
            }
        }

        if (isMyEvent(event._id)) {
            return {
                eventId: event._id,
                isMyEvent: true,
                orderSubmit: false
            }
        }

        Meteor.users.update(user._id, {
            $push: {
                eventOrders: {
                    eventId: event._id,
                    eventName: event.name,
                    orderStatus: orderStatuses.expects
                }
            }
        }, function (error) {
            if (error) throw new Meteor.Error(error.reason);
            return {
                eventId: event._id,
                orderSubmit: true,
                orderStatus: orderStatuses.expects
            };
        });
    },
    acceptOrder: function (eventId, submitterId) {
        check(Meteor.userId(), NonEmptyString);
        check(eventId, NonEmptyString);
        check(submitterId, NonEmptyString);

        Meteor.users.update({
                _id: submitterId,
                eventOrders: {$elemMatch: {eventId: eventId}}
            }, {$set: {'eventOrders.$.orderStatus': orderStatuses.accepted}},
            function (error) {
                if (error) throw new Meteor.Error(error.reason);
                return {
                    submitterId: submitterId,
                    eventId: eventId,
                    orderStatus: orderStatuses.accepted
                }
            });
    },
    rejectOrder: function (eventId, submitterId) {
        check(Meteor.userId(), NonEmptyString);
        check(eventId, NonEmptyString);
        check(submitterId, NonEmptyString);

        Meteor.users.update({
                _id: submitterId,
                eventOrders: {$elemMatch: {eventId: eventId}}
            }, {$set: {'eventOrders.$.orderStatus': orderStatuses.rejected}},
            function (error) {
                if (error) throw new Meteor.Error(error.reason);
                return {
                    submitterId: submitterId,
                    eventId: eventId,
                    orderStatus: orderStatuses.rejected
                }
            });
    },
    removeOrder: function (eventId) {
        check(Meteor.userId(), NonEmptyString);
        check(eventId, NonEmptyString);


        Meteor.users.update(Meteor.userId(), {$pull: {eventOrders: {eventId: eventId}}}, function (error) {
            if (error) throw new Meteor.Error(error.reason);
            return {
                eventId: eventId,
                orderRemove: true
            };
        });
    }
});

//Meteor.methods({
//    insertOrder: function (eventId) {
//        check(Meteor.userId(), NonEmptyString);
//        check(eventId, NonEmptyString);
//
//        var user = Meteor.user();
//
//        var isSubmitted = Events.findOne({_id: eventId, submitters: {$elemMatch: {_id: user._id}}});
//        if (isSubmitted) {
//            return {
//                eventId: eventId,
//                orderExists: true
//            }
//        }
//
//        if (isMyEvent()) {
//            return {
//                eventId: eventId,
//                isMyEvent: true,
//                orderSubmit: false
//            }
//        }
//
//        Events.update(eventId, {$push: {submitters: {_id: user._id, username: user.username}}}, function (error) {
//            if (error) throw new Meteor.Error(error.reason);
//            return {
//                eventId: eventId,
//                orderSubmit: true
//            };
//        });
//    },
//    removeOrder: function(eventId){
//        check(Meteor.userId(), NonEmptyString);
//        check(eventId, NonEmptyString);
//
//        Events.update(eventId, {$pull: {submitters: {_id: user._id}}}, function (error) {
//            if (error) throw new Meteor.Error(error.reason);
//            return {
//                eventId: eventId,
//                orderRemove: true
//            };
//        });
//    }
//});
