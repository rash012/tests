Reviews = new Mongo.Collection('reviews');

Meteor.methods({
    saveUserReview: function (reviewedUserId, review) {
        var currentUser = Meteor.user();

        check(currentUser._id, NonEmptyString);
        check(reviewedUserId, NonEmptyString);
        check(review, NonEmptyString);

        if (isThisUser(reviewedUserId)) {
            throw new Meteor.Error('Вы не можете оставить отзыв самому себе');
        }

        if (!isInSameStartedEventWithUser(reviewedUserId)) {
            throw new Meteor.Error('Вы не участвовали ни в одном событии с данным пользователем');
        }

        Reviews.upsert({
            reviewerId: currentUser._id,
            userId: reviewedUserId
        }, {
            reviewerId: currentUser._id,
            userId: reviewedUserId,
            reviewerUsername: currentUser.username,
            review: review
        }, function (error) {
            if(error) throw new Meteor.Error(error);
        });

        return {
            reviewerId: currentUser._id,
            userId: reviewedUserId,
            reviewerUsername: currentUser.username,
            review: review
        }
    },
    removeUserReview: function (userId) {
        var currentUserId = Meteor.userId();

        check(currentUserId, NonEmptyString);
        check(userId, NonEmptyString);

        Reviews.remove({
            reviewerId: currentUserId,
            userId: userId
        });
    }
});

//todo запретить оставлять себе отзывы и голосовать за себя
//todo когда можно голосовать и оставлять отзывы? что сказать пользователям, которые голосуют раньше времени?