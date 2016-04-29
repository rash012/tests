// Local (client-only) collection
Alerts = new Mongo.Collection(null);

showAlert = function(message) {
    Alerts.insert({message: message});
};