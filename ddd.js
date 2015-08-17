if (Meteor.isClient) {
  Template.options.helpers({
    options: function () {
      return Options.find();
    }
  });
  Template.options.events({
    'click .option': function(){
      Votes.insert({'user_id': Meteor.userId, 'option': this._id});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
