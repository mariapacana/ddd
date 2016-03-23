Template.admin.helpers({
  currentRound: function() {
    var currentRound = Rounds.findOne({current: true});
    return currentRound;
  },
  needToAdvance: function() {
    var currentRound = Rounds.findOne({current: true});
    return currentRound.state === VOTING;
  },
  needFeedback: function() {
    var currentRound = Rounds.findOne({current: true});
    return currentRound.state === ACTION;
  },
  needVotes: function() {
    var currentRound = Rounds.findOne({current: true});
    return currentRound.state == STARTING || currentRound.state === FEEDBACK;
  }
});

Template.admin.events({
  'click #getFeedback': function() {
    Meteor.call('getFeedback');
  },
  'click #getVotes': function() {
    Meteor.call('getVotes');
  },
  'click #advanceRound': function() {
    Meteor.call('advanceRound');
  }
});