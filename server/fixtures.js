Meteor.startup(function () {
    if (Events.find().count() === 0) {
        Events.insert({
            begin: "01:01",
            date: "2016-04-01",
            description: "aaa",
            end: "01:01",
            eventName: "aaaaaaaa",
            submitted: new Date,
            type: "aaaa",
            userId: "0",
            username: "test5"
        });
        Events.insert({
            begin: "01:02",
            date: "2016-04-01",
            description: "aaa",
            end: "01:01",
            eventName: "aaaaaaaa",
            submitted: new Date,
            type: "aaaa",
            userId: "0",
            username: "test5"
        });
        Events.insert({
            begin: "01:00",
            date: "2016-04-01",
            description: "aaa",
            end: "01:01",
            eventName: "aaaaaaaa",
            submitted: new Date,
            type: "aaaa",
            userId: "0",
            username: "test5"
        });
        Events.insert({
            begin: "01:02",
            date: "2016-04-02",
            description: "aaa",
            end: "01:01",
            eventName: "aaaaaaaa",
            submitted: new Date,
            type: "aaaa",
            userId: "0",
            username: "test5"
        });
        Events.insert({
            begin: "01:01",
            date: "2016-04-02",
            description: "aaa",
            end: "01:01",
            eventName: "aaaaaaaa",
            submitted: new Date,
            type: "aaaa",
            userId: "0",
            username: "test5"
        });
        Events.insert({
            begin: "01:02",
            date: "2016-04-03",
            description: "aaa",
            end: "01:01",
            eventName: "aaaaaaaa",
            submitted: new Date,
            type: "aaaa",
            userId: "0",
            username: "test5"
        });
    }
    if (Meteor.users.find().count() === 0) {
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

