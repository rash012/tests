Meteor.startup(function () {
    if (Meteor.users.find().count() === 0) {
        Accounts.createUser({
            username: 'admin',
            email: 'admin@admin.ru',
            password: ' ',
        });
        Accounts.createUser({
            username: 'moderator',
            email: 'moderator@moderator.ru',
            password: ' ',
        });
        Accounts.createUser({
            username: 'test',
            email: 'test@test.ru',
            password: ' ',
        });
        Accounts.createUser({
            username: 'test1',
            email: 'test1@test.ru',
            password: ' ',
        });
        Accounts.createUser({
            username: 'test2',
            email: 'test2@test.ru',
            password: ' ',
        });
    }
});

