Template._userSubmitted.events({
    'click #accept-order': function (e) {
        e.preventDefault();

        var event = this;
        Orders.update({eventId:event._id},{$set:{isAccepted:1}});
    }
});