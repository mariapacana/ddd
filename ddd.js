if (Meteor.isClient) {
  Template.options.helpers({
    options: function() {
      return Options.find();
    },
    optionVotes: function(optionId) {
      return Votes.find({'optionId': optionId}).count();
    }
  });
  Template.options.events({
    'click .option': function(){
        var count = Votes.find({'optionId': this._id, 'userId': Meteor.userId}).count();
        if (count === 0)
          Votes.insert({'userId': Meteor.userId, 'optionId': this._id});
    }
  });
}