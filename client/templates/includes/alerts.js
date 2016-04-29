Template.alerts.helpers({
    alerts: function() {
        return Alerts.find();
    }
});

Template.alert.onRendered(function() {
    var alert = this.data;
    Meteor.setTimeout(function () {
        Alerts.remove(alert._id);
    }, 5000);
});