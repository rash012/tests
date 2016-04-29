Template.userReviewForm.events({
    'submit form': function (e) {
        e.preventDefault();

        var target = e.currentTarget;

        var review = $('textarea[name=user-review]').val();

        Meteor.call('saveUserReview', this._id, review,function (error, result) {
            if (error) {
                return throwError(error.reason);
            }
            if (result) {
                return showAlert('Отзыв сохранен');
            }
        });

        slideUpForm(target);
    },
    'click #remove-user-review': function (e) {
        e.preventDefault();

        var target = e.currentTarget;

        Meteor.call('removeUserReview', this._id, function (error, result) {
            if (error) {
                return throwError(error.reason);
            }
            if (result) {
                return showAlert('Отзыв удалён');
            }
        });

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