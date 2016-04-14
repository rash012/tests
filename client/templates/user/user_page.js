Template.userPage.helpers({
    eventsCount: function(){
        return Events.find({'owner._id':this._id}).count();
    },
    ordersReceivedTotalCount: function(){
        var eventsIds = usersEventsIds(Meteor.userId());
        return Orders.find({eventId:{$in:eventsIds}}).count();
    }
});