Template.admin.helpers({
  needToAdvance: function() {
    return this.state === VOTING;
  },
  needFeedback: function() {
    return this.state === ACTION;
  },
  needVotes: function() {
    return this.state == STARTING || this.state === FEEDBACK;
  },
  advanceButtonText: function() {
    return (this.roundCount < MAX_ROUNDS)
      ? "Go to Next Round"
      : "End Game";
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
    if (this.roundCount < MAX_ROUNDS) {
      Meteor.call('advanceRound');
    } else {
      Meteor.call('endGame');
    }
  }
});