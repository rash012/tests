Meteor.methods({
    // voteUp: function (votedUserId) {
    //     var currentUserId = Meteor.userId();
    //
    //     check(currentUserId, NonEmptyString);
    //     check(votedUserId, NonEmptyString);
    //
    //     if(isThisUser(votedUserId)) {
    //         throw new Meteor.Error('Вы не можете голосовать за или против себя');
    //     }
    //
    //     if (!isInSameStartedEventWithUser(votedUserId)) {
    //         throw new Meteor.Error('Вы не участвовали ни в одном событии с данным пользователем');
    //     }
    //
    //     var isVotedDown = userIsVotedDown(votedUserId, currentUserId);
    //     var isVotedUp = userIsVotedUp(votedUserId, currentUserId);
    //
    //     if (isVotedDown) {
    //         Meteor.users.update({
    //             _id: votedUserId,
    //             'votes.upvoters': {$ne: currentUserId}
    //         }, {
    //             $addToSet: {'votes.upvoters': currentUserId},
    //             $pull: {'votes.downvoters': currentUserId},
    //             $inc: {'votes.rating': 2}
    //         }, function () {
    //             return {
    //                 userId: votedUserId,
    //                 upvoted: 2
    //             }
    //         });
    //     } else if (isVotedUp) {
    //         Meteor.users.update({
    //             _id: votedUserId,
    //         }, {
    //             $pull: {'votes.upvoters': currentUserId},
    //             $inc: {'votes.rating': -1}
    //         }, function () {
    //             return {
    //                 userId: votedUserId,
    //                 downvoted: 1
    //             }
    //         });
    //     } else {
    //         Meteor.users.update({
    //             _id: votedUserId,
    //             'votes.upvoters': {$ne: currentUserId}
    //         }, {
    //             $addToSet: {'votes.upvoters': currentUserId},
    //             $inc: {'votes.rating': 1}
    //         }, function () {
    //             return {
    //                 userId: votedUserId,
    //                 upvoted: 1
    //             }
    //         });
    //     }
    //
    //
    // },
    // voteDown: function (votedUserId) {
    //     var currentUserId = Meteor.userId();
    //
    //     check(currentUserId, NonEmptyString);
    //     check(votedUserId, NonEmptyString);
    //
    //     if(isThisUser(votedUserId)) {
    //         throw new Meteor.Error('Вы не можете голосовать за или против себя');
    //     }
    //
    //     if (!isInSameStartedEventWithUser(votedUserId)) {
    //         throw new Meteor.Error('Вы не участвовали ни в одном событии с данным пользователем');
    //     }
    //
    //     var isVotedDown = userIsVotedDown(votedUserId, currentUserId);
    //     var isVotedUp = userIsVotedUp(votedUserId, currentUserId);
    //
    //     if (isVotedUp) {
    //         Meteor.users.update({
    //             _id: votedUserId,
    //             'votes.downvoters': {$ne: currentUserId}
    //         }, {
    //             $addToSet: {'votes.downvoters': currentUserId},
    //             $pull: {'votes.upvoters': currentUserId},
    //             $inc: {'votes.rating': -2}
    //         }, function () {
    //             return {
    //                 userId: votedUserId,
    //                 downvoted: 2
    //             }
    //         });
    //     } else if (isVotedDown) {
    //         Meteor.users.update({
    //             _id: votedUserId,
    //         }, {
    //             $pull: {'votes.downvoters': currentUserId},
    //             $inc: {'votes.rating': 1}
    //         }, function () {
    //             return {
    //                 userId: votedUserId,
    //                 upvoted: 1
    //             }
    //         });
    //     } else {
    //         Meteor.users.update({
    //             _id: votedUserId,
    //             'votes.downvoters': {$ne: currentUserId}
    //         }, {
    //             $addToSet: {'votes.downvoters': currentUserId},
    //             $inc: {'votes.rating': -1}
    //         }, function () {
    //             return {
    //                 userId: votedUserId,
    //                 downvoted: 1
    //             }
    //         });
    //     }
    // },
});

// userIsVotedUp = function (votedUserId, currentUserId) {
//     return !!Meteor.users.findOne({
//         _id: votedUserId,
//         'votes.upvoters': currentUserId
//     });
// };
// userIsVotedDown = function (votedUserId, currentUserId) {
//     return !!Meteor.users.findOne({
//         _id: votedUserId,
//         'votes.downvoters': currentUserId
//     });
// };

getUsersSubmitted = function (eventId, status) {
    var orders = Orders.find({eventId: eventId, status: status}).fetch();
    var usersIds = _.map(orders, function (order) {
        return order.userId;
    });
    var users = Meteor.users.find({_id: {$in: usersIds}});
    if (!_.isEmpty(users.fetch())) return users;
    else return false;
};

isThisUser = function (userId) {
    return Meteor.userId() == userId;
};

/**
 * Проверяет участвовал ли текущий пользователь с другим пользователем в одном и том же событии
 * @param userId
 * @returns {boolean}
 */
isInSameStartedEventWithUser = function (userId) {
    var orders = Orders.find({status: orderStatuses.accepted}).fetch();

    var usersEventIds = [];
    _.each(orders, function (order) {
        if (order.userId == userId) usersEventIds.push(order.eventId);
    });

    var myEventIds = [];
    _.each(orders, function (order) {
        if (order.userId == Meteor.userId()) myEventIds.push(order.eventId);
    });

    //события на которые приняты оба пользователя
    var matchesEventsIds = _.intersection(usersEventIds, myEventIds);

    var matchesEvents = Events.find({_id: {$in: matchesEventsIds}}).fetch();

    var match = false;
    _.each(matchesEvents, function (event) {
        if (isEventStarted(event)) {
            match = true;
            return;
        }
    });

    return match;
};

//todo имя фамилия пользователя



