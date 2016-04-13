getMonthNameByNumber = function (monthNumber) {
    switch (monthNumber) {
        case 1:
            return 'январь';
        case 2:
            return 'февраль';
        case 3:
            return 'март';
        case 4:
            return 'апрель';
        case 5:
            return 'май';
        case 6:
            return 'июнь';
        case 7:
            return 'июль';
        case 8:
            return 'август';
        case 9:
            return 'сентябрь';
        case 10:
            return 'октябрь';
        case 11:
            return 'ноябрь';
        case 12:
            return 'декабрь';
    }
};
getMonthNameByNumber.withEnding = function (monthNumber) {
    switch (monthNumber) {
        case 1:
            return 'января';
        case 2:
            return 'февраля';
        case 3:
            return 'марта';
        case 4:
            return 'апреля';
        case 5:
            return 'мая';
        case 6:
            return 'июня';
        case 7:
            return 'июля';
        case 8:
            return 'августа';
        case 9:
            return 'сентября';
        case 10:
            return 'октября';
        case 11:
            return 'ноября';
        case 12:
            return 'декабря';
    }
};


isLeapYear = function (fullYear) {
    return fullYear % 4 == 0 && fullYear % 100 != 0 || fullYear % 400 == 0;
};

getDaysInMonth = function (monthNumber, fullYear) {
    return arguments.callee[isLeapYear(fullYear) ? 'L' : 'R'][monthNumber - 1];
};

// durations of months for the regular year
getDaysInMonth.R = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// durations of months for the leap year
getDaysInMonth.L = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

getCurrentYear = function () {
    return (new Date).getFullYear();
};
getCurrentMonth = function () {
    return (new Date).getMonth() + 1;
};
getCurrentDateDay = function () {
    return (new Date).getDate();
};

//convertDate = function (formattedDate) {
//    var splitted = formattedDate.split('.');
//    var splittedConverted = _.map(splitted, function (el) {
//        if (el[0] == '0') {
//            return el.slice(1);
//        }
//        return el;
//    });
//    return splittedConverted.join('.');
//};

formatDateToIso = function (year, month, day) {
    var dd = day;
    if (dd < 10) dd = '0' + dd;

    var mm = month;
    if (mm < 10) mm = '0' + mm;

    return year + '-' + mm + '-' + dd;
};

formatToLocalDate = {
    from3args: function (year, month, day) {
        var dd = day;
        if (dd < 10) dd = '0' + dd;

        var mm = month;
        if (mm < 10) mm = '0' + mm;

        return dd + '.' + mm + '.' + year
    },
    fromIsoString: function (dateString) {
        var splitted = dateString.split('-');

        return splitted[2] + '-' + splitted[1] + '-' + splitted[0];
    }
};


previousMonthYear = function (month, year) {
    var prevMonth = month - 1;
    var prevYear = year;
    if (prevMonth == 0) {
        prevMonth = 12;
        prevYear = year - 1;
    }
    return {
        month: prevMonth,
        year: prevYear
    }
};

nextMonthYear = function (month, year) {
    var nextMonth = month + 1;
    var nextYear = year;
    if (nextMonth == 13) {
        nextMonth = 1;
        nextYear = year + 1;
    }
    return {
        month: nextMonth,
        year: nextYear
    }
};

NonEmptyString = Match.Where(function (x) {
    check(x, String);
    return x.length > 0;
});

wordWithEnding = {
    event: function (count) {
        var lastNumber = Math.abs(count) % 10;
        if (lastNumber == 0 || (lastNumber >= 5 && lastNumber <= 9))return 'событий';
        if (lastNumber == 1)return 'событие';
        if (lastNumber >= 2 && lastNumber <= 4)return 'события';
    },
};

isMyEvent = function (eventId) {
    return !!Events.findOne({'owner._id': Meteor.userId(), _id: eventId});
};

getOrderStatus = function (eventId, userId) {
    return Orders.findOne({userId: userId, eventId: eventId}).status;
};

