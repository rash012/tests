OrganizerVotes = new Mongo.Collection('organizerVotes');

Meteor.methods({
    organizerVoteUp: function (organizerId, eventId) {
        var voter = Meteor.user();
        check(voter._id, NonEmptyString);
        check(organizerId, NonEmptyString);
        check(eventId, NonEmptyString);

        var isVotedUp = organizerIsVotedUp(organizerId, voter._id);
        var isVotedDown = organizerIsVotedDown(organizerId, voter._id);

        if (isVotedUp) {
            OrganizerVotes.remove({
                organizerId: organizerId,
                voterId: voter._id,
                eventId: eventId,
                up: true
            });
        } else if (isVotedDown) {
            OrganizerVotes.update({
                organizerId: organizerId,
                voterId: voter._id,
                eventId: eventId,
                down: true
            }, {
                $set: {up: true},
                $unset: {down: ''}
            });
        } else {
            OrganizerVotes.insert({
                organizerId: organizerId,
                voterId: voter._id,
                eventId: eventId,
                up: true
            });
        }
    },
    organizerVoteDown: function (organizerId, eventId) {
        var voter = Meteor.user();
        check(voter._id, NonEmptyString);
        check(organizerId, NonEmptyString);
        check(eventId, NonEmptyString);

        var isVotedUp = organizerIsVotedUp(organizerId, voter._id);
        var isVotedDown = organizerIsVotedDown(organizerId, voter._id);

        if (isVotedDown) {
            OrganizerVotes.remove({
                organizerId: organizerId,
                voterId: voter._id,
                eventId: eventId,
                down: true
            });
        } else if (isVotedUp) {
            OrganizerVotes.update({
                organizerId: organizerId,
                voterId: voter._id,
                eventId: eventId,
                up: true
            }, {
                $set: {down: true},
                $unset: {up: ''}
            });
        } else {
            OrganizerVotes.insert({
                organizerId: organizerId,
                voterId: voter._id,
                eventId: eventId,
                down: true
            });
        }

    }
});

organizerRating = function (organizerId) {
    return OrganizerVotes.find({
            organizerId: organizerId,
            up: true
        }).count() - OrganizerVotes.find({organizerId: organizerId, down: true}).count();
};

organizerIsVotedUp = function (organizerId, voterId) {
    return !!OrganizerVotes.findOne({
        organizerId: organizerId,
        voterId: voterId,
        up: true
    });
};
organizerIsVotedDown = function (organizerId, voterId) {
    return !!OrganizerVotes.findOne({
        organizerId: organizerId,
        voterId: voterId,
        down: true
    });
};