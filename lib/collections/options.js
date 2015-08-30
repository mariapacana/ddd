Options = new Mongo.Collection("options");

var options = [{round: 1, text: "juggling"},
               {round: 1, text: "singing"},
               {round: 1, text: "levitating"},
               {round: 2, text: "dancing"},
               {round: 2, text: "finding the meaning of life"},
               {round: 2, text: "getting prime factors"}];

// Otherwise, options will be added on the client before the data is
// sent over from the server, doubling the number of options.
if (Meteor.isServer && Options.find().count() === 0) {
  _.each(options, function(doc) {
    Options.insert(doc);
  });
}