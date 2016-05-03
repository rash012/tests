Template.votes.events({
    'click #vote-up': function (e) {
        e.preventDefault();

        var eventId = Router.current().params._id;

        if (!isInSameStartedEventWithUser(this._id)) {
            throwError('Вы не участвовали ни в одном событии с данным пользователем');
            return;
        }
        Meteor.call('voteUp', this._id, eventId);
    },
    'click #vote-down': function (e) {
        e.preventDefault();

        var eventId = Router.current().params._id;

        if (!isInSameStartedEventWithUser(this._id)) {
            throwError('Вы не участвовали ни в одном событии с данным пользователем');
            return;
        }

        Meteor.call('voteDown', this._id, eventId);
    },
});

Template.votes.helpers({
    votedClass: function (direction) {
        var userId = Meteor.userId();
        var eventId = Router.current().params._id;

        if (direction === 'up') {
            if (isVotedUp(eventId, this._id, userId)) {
                return '_voted';
            }
        } else if (direction === 'down') {

            if (isVotedDown(eventId, this._id, userId)) {
                return '_voted';
            }
        }
    },
    votesUpCount: function (userId) {
        var votes = Votes.find({isPublished: true}).fetch();
        var userVotes = _.where(votes, {votedUserId: userId, up: 1});

        return _.size(userVotes);
    },
    votesDownCount: function (userId) {
        var votes = Votes.find({isPublished: true}).fetch();
        var userVotes = _.where(votes, {votedUserId: userId, down: 1});
        return _.size(userVotes);
    }
});
