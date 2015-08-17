Options = new Mongo.Collection("options");

var options = [{text: "juggling"},
               {text: "singing"},
               {text: "levitating"}];

if (Options.find().count() === 0) {
  _.each(options, function(doc) {
    Options.insert(doc);
  });
}