Template.options.helpers({
  options: function() {
    return Options.find({round: this.roundCount});
  },
  optionVotes: function() {
    return Votes.find({optionId: this._id, round: this.round}).count();
  }
});

Template.options.events({
  'click .option': function() {
      var userId = Meteor.userId();
      var count = Votes.find({'userId': userId,
                              'round': this.round}).count();
      if (count === 0)
        Votes.insert({'userId': userId,
                      'optionId': this._id,
                      'round': this.round});
  }
});