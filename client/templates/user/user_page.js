Template.userPage.helpers({
    ordersReceivedTotalCount: function(){
        var eventsIds = currentUserCreatedEventsIds(this.user._id);
        return +Orders.find({eventId:{$in:eventsIds}}).count() - this.eventsCount();//вычитаем заявки организатора, количество которых равно количеству созданных событий
    },
    rating:function () {
        if(this.user.votes) return this.user.votes.rating;
        else return 0;
    }
});