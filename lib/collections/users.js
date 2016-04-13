//Meteor.methods({
//    insertOrder: function (eventId) {
//        check(Meteor.userId(), NonEmptyString);
//        check(eventId, NonEmptyString);
//
//        var user = Meteor.user();
//
//        var isSubmitted = Meteor.users.findOne({_id: user._id, eventOrders: {$elemMatch: {eventId: eventId}}});
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
//        Meteor.users.update(user._id, {$push: {eventOrders: {eventId: eventId}}}, function (error) {
//            if (error) throw new Meteor.Error(error.reason);
//            return {
//                eventId: eventId,
//                orderSubmit: true
//            };
//        });
//    },
//    removeOrder: function (eventId) {
//        check(Meteor.userId(), NonEmptyString);
//        check(eventId, NonEmptyString);
//
//
//        Meteor.users.update(Meteor.userId(), {$pull: {eventOrders: {eventId: eventId}}}, function (error) {
//            if (error) throw new Meteor.Error(error.reason);
//            return {
//                eventId: eventId,
//                orderRemove: true
//            };
//        });
//    }
//});