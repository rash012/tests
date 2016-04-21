Template.layout.events({
    'click #write-user-review': function (e) {
        e.preventDefault();

        $('#user-review-form').slideToggle();

    },
});