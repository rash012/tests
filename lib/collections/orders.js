Orders = new Mongo.Collection('orders');

Meteor.methods({
    insertOrder: function (eventId) {
        check(Meteor.userId(), NonEmptyString);
        check(eventId, NonEmptyString);

        var user = Meteor.user();

        var isSubmitted = Orders.findOne({userId: user._id, eventId: eventId});
        if (isSubmitted) {
            return {
                orderExists: true,
                _id: isSubmitted._id
            }
        }

        if(isMyEvent()){
            return {
                isMyEvent: true,
                _id: eventId
            }
        }

        var order = {
            userId: user._id,
            username: user.username,
            submitted: new Date(),
            eventId: eventId
        };

        var orderId = Orders.insert(order);

        return {
            orderId: orderId
        }
    },
    removeOrder: function(eventId){
        check(Meteor.userId(), NonEmptyString);
        check(eventId, NonEmptyString);

        Orders.remove({eventId: eventId, userId:Meteor.userId()},function(error){
            if(error) throw new Meteor.Error(error.reason);
            return {
                deleted: true
            };
        });
    }
});