Template.options.onRendered(function() {
  Session.set('currentOption', null);
})

Template.options.helpers({
  options: function() {
    return Options.find({round: this.roundCount});
  },
  selectedOption: function() {
    return Session.get('currentOption');
  }
});

Template.options.events({
  'click .option': function() {
    var userId = Meteor.userId();
    var count = Votes.find({'userId': userId,
                            'round': this.round}).count();
    if (count === 0) {
      Session.set('currentOption', this.text);
      Votes.insert({'userId': userId,
                    'optionId': this._id,
                    'round': this.round});
      Options.update({_id: this._id}, {$inc: {votes: 1}});
    }
  }
});

Template.option_header.helpers({
  isFinale: function() {
    return this.mode === "finale";
  },
  pronoun: function() {
    return (this.mode === "solo") ? "I" : "we";
  }
});