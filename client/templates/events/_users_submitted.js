Template._usersSubmitted.helpers({
    users: function(){
        var eventId = Router.current().params._id;
        return getUsersSubmitted(eventId, orderStatuses.expects);
    }
});