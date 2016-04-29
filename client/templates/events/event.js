Template.event.helpers({
    getMembersCount: function () {
        return getOrdersCount(this._id, orderStatuses.accepted) +1;//добавляем организатора
    }
});