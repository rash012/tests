Template.votes.events({
    'click #vote-up': function (e) {
        e.preventDefault();

        if(!isInSameStartedEventWithUser(this._id)){
            throwError('Вы не участвовали ни в одном событии с данным пользователем');
            return;
        }
        Meteor.call('voteUp', this._id);
    },
    'click #vote-down': function (e) {
        e.preventDefault();

        if(!isInSameStartedEventWithUser(this._id)){
            throwError('Вы не участвовали ни в одном событии с данным пользователем');
            return;
        }

        Meteor.call('voteDown', this._id);
    },
});

Template.votes.helpers({
    votedClass: function (direction) {
        var userId = Meteor.userId();

        if (!this.votes) return '';

        if (direction === 'up') {
            if (userId && _.include(this.votes.upvoters, userId)) {
                return '_voted';
            }
        } else if (direction === 'down') {

            if (userId && _.include(this.votes.downvoters, userId)) {
                return '_voted';
            }
        }
    }
});
