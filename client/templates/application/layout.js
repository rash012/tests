Template.layout.events({
    'click .link-disable': function (e) {
        e.preventDefault();
        return false;
    },
    'click #write-user-review': function (e) {
        e.preventDefault();

        var target = e.currentTarget;

        $(target).siblings('#user-review-form').slideToggle();

    },
});