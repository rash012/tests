Template.userReviewForm.events({
    'submit form': function (e) {
        e.preventDefault();

        var target = e.currentTarget;

        var review = $('textarea[name=user-review]').val();

        Meteor.call('saveUserReview', this._id, review);

        slideUpForm(target);
    },
    'click #remove-user-review': function (e) {
        e.preventDefault();

        var target = e.currentTarget;

        Meteor.call('removeUserReview', this._id);

        slideUpForm(target);
    },
});

Template.userReviewForm.helpers({
    review: function () {
        var reviewRecord = Reviews.findOne({reviewerId:Meteor.userId(), userId: this._id});
        if(reviewRecord) return reviewRecord.review;
    }
});

var slideUpForm = function (target) {
    $(target).closest('form').slideUp();
};