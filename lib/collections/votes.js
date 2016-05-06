Votes = new Mongo.Collection('votes');

Meteor.methods({
    voteUp: function (votedUserId, eventId) {
        var voterId = Meteor.userId();

        check(voterId, NonEmptyString);
        check(votedUserId, NonEmptyString);
        check(eventId, NonEmptyString);

        if (isThisUser(votedUserId)) {
            throw new Meteor.Error('Вы не можете голосовать за или против себя');
        }

        if (!isEventStarted(eventId)) {
            throw new Meteor.Error('Событие еще не началось');
        }

        var votedDown = isVotedDown(eventId, votedUserId, voterId);
        var votedUp = isVotedUp(eventId, votedUserId, voterId);

        if (votedDown) {
            // Votes.update({
            //     votedUserId: votedUserId,
            //     eventId: eventId,
            //     voterId: voterId,
            // }, {
            //     $unset: {down: ''}
            // });

            Votes.remove({
                votedUserId: votedUserId,
                eventId: eventId,
                voterId: voterId,
            });

            return {
                votedUserId: votedUserId,
                eventId: eventId,
                voterId: voterId,
                up: 0,
                down: 0
            }
        } else if (votedUp) {
            return {
                alreadyVotedUp: true,
                votedUserId: votedUserId,
                eventId: eventId,
                voterId: voterId,
            }
        }

        // var isPublished = function () {
        //     var event = Events.findOne(eventId);
        //     var eventDateTime = new Date(event.date + ' ' + event.begin);
        //     return (new Date() - new Date(eventDateTime)) > msInDay;
        // };

        Votes.insert({
            votedUserId: votedUserId,
            eventId: eventId,
            voterId: voterId,
            up: 1,
            down: 0
        });

        return {
            votedUserId: votedUserId,
            eventId: eventId,
            voterId: voterId,
            up: 1
        };
    },
    voteDown: function (votedUserId, eventId) {
        var voterId = Meteor.userId();

        check(voterId, NonEmptyString);
        check(votedUserId, NonEmptyString);
        check(eventId, NonEmptyString);

        if (isThisUser(votedUserId)) {
            throw new Meteor.Error('Вы не можете голосовать за или против себя');
        }

        if (!isEventStarted(eventId)) {
            throw new Meteor.Error('Событие еще не началось');
        }

        var votedDown = isVotedDown(eventId, votedUserId, voterId);
        var votedUp = isVotedUp(eventId, votedUserId, voterId);

        if (votedDown) {
            return {
                alreadyVotedUp: true,
                votedUserId: votedUserId,
                eventId: eventId,
                voterId: voterId,
            }
        } else if (votedUp) {
            // Votes.update({
            //     votedUserId: votedUserId,
            //     eventId: eventId,
            //     voterId: voterId,
            // }, {
            //     $unset: {up: ''}
            // });

            Votes.remove({
                votedUserId: votedUserId,
                eventId: eventId,
                voterId: voterId,
            });

            return {
                votedUserId: votedUserId,
                eventId: eventId,
                voterId: voterId,
                up: 0,
                down: 0
            }
        }

        // var isPublished = function () {
        //     var event = Events.findOne(eventId);
        //     var eventDateTime = new Date(event.date + ' ' + event.begin);
        //     return (new Date() - new Date(eventDateTime)) > msInDay;
        // };

        Votes.insert({
            votedUserId: votedUserId,
            eventId: eventId,
            voterId: voterId,
            up: 0,
            down: 1
        });

        return {
            votedUserId: votedUserId,
            eventId: eventId,
            voterId: voterId,
            down: 1
        };
    }
});

isVotedUp = function (eventId, votedUserId, voterId) {
    return !!Votes.findOne({
        votedUserId: votedUserId,
        voterId: voterId,
        eventId: eventId,
        up: 1
    });
};
isVotedDown = function (eventId, votedUserId, voterId) {
    return !!Votes.findOne({
        votedUserId: votedUserId,
        voterId: voterId,
        eventId: eventId,
        down: 1
    });
};