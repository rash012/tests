Orders = new Mongo.Collection('orders');

Meteor.methods({
    insertOrder: function (event) {
        check(Meteor.userId(), NonEmptyString);
        check(event, {
            _id: NonEmptyString,
            name: NonEmptyString,
        });

        var user = Meteor.user();

        var isSubmitted = Orders.findOne({userId: user._id, eventId: event._id});
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

        Orders.insert({userId: user._id,eventId:event._id, eventName: event.name, status: orderStatuses.expects}, function (error) {
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

        Orders.update({
                userId: submitterId,
                eventId: eventId
            }, {$set: {status: orderStatuses.accepted}},
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

        Orders.update({
                userId: submitterId,
                eventId: eventId
            }, {$set: {status: orderStatuses.rejected}},
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

        Orders.remove({userId:Meteor.userId(), eventId: eventId}, function (error) {
            if (error) throw new Meteor.Error(error.reason);
            return {
                eventId: eventId,
                orderRemove: true
            };
        });
    }
});