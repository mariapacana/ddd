if (Meteor.isClient) {
  Template.options.helpers({
    options: function () {
      return Options.find();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
