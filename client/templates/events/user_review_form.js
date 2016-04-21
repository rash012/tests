Template.userReviewForm.events({
    'submit form': function (e) {
        e.preventDefault();

        var review = $('textarea[name=user-review]').val();

        Meteor.call('saveUserReview', this._id, review);

        $('form').slideUp();
    },
    'click #remove-user-review': function (e) {
        e.preventDefault();

        Meteor.call('removeUserReview', this._id);

        $('form').slideUp();
    },
});

Template.userReviewForm.helpers({
    review: function () {
        var reviewRecord = Reviews.findOne({reviewerId:Meteor.userId(), userId: this._id});
        if(reviewRecord) return reviewRecord.review;
    }
});