Meteor.methods({
    insertOrder: function (eventId) {
        check(Meteor.userId(), NonEmptyString);
        check(eventId, NonEmptyString);

        var user = Meteor.user();

        var isSubmitted = Meteor.users.findOne({_id: user._id, eventOrders: {$elemMatch: {eventId: eventId}}});
        if (isSubmitted) {
            return {
                eventId: eventId,
                orderExists: true
            }
        }

        if (isMyEvent(eventId)) {
            return {
                eventId: eventId,
                isMyEvent: true,
                orderSubmit: false
            }
        }

        Meteor.users.update(user._id, {
            $push: {
                eventOrders: {
                    eventId: eventId,
                    orderStatus: orderStatuses.expects
                }
            }
        }, function (error) {
            if (error) throw new Meteor.Error(error.reason);
            return {
                eventId: eventId,
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
