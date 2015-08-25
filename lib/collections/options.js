Options = new Mongo.Collection("options");

var options = [{text: "juggling"},
               {text: "singing"},
               {text: "levitating"}];

// Otherwise, options will be added on the client before the data is
// sent over from the server, doubling the number of options.
if (Meteor.isServer && Options.find().count() === 0) {
  _.each(options, function(doc) {
    Options.insert(doc);
  });
}