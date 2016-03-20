Template.admin.helpers({
  currentRound: function() {
    var currentRound = Rounds.findOne({current: true});
    return currentRound;
  },
  lastRoundWinner: function() {
    var lastRound;
    if (this.roundCount && this.roundCount >= 2) {
      lastRound = Rounds.findOne({roundCount: this.roundCount-1});
      return lastRound && lastRound.winner;
    } else {
      return false;
    }
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