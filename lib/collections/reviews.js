Reviews = new Mongo.Collection('reviews');

Meteor.methods({
    saveUserReview: function (userId, review) {
        var currentUser = Meteor.user();

        check(currentUser._id, NonEmptyString);
        check(userId, NonEmptyString);
        check(review, NonEmptyString);

        if (isThisUser(userId)) {
            throw new Meteor.Error('Вы не можете оставить отзыв самому себе');
        }

        Reviews.upsert({
            reviewerId: currentUser._id,
            userId: userId
        }, {
            reviewerId: currentUser._id,
            userId: userId,
            reviewerUsername: currentUser.username,
            review: review
        }, function () {
            return {
                reviewerId: currentUser._id,
                userId: userId,
                reviewerUsername: currentUser.username,
                review: review
            }
        });

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