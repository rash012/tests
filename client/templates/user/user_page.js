Template.userPage.helpers({
    eventsCount: function(){
        return Events.find({'owner._id':this.user._id}).count();
    },
    ordersReceivedTotalCount: function(){
        var eventsIds = usersCreatedEventsIds(Meteor.userId());
        return Orders.find({eventId:{$in:eventsIds}}).count();
    },
    rating:function () {
        if(this.user.votes) return this.user.votes.rating;
        else return 0;
    }
});