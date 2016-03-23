Template.audience.helpers({
  gettingVotes: function() {
    var currentRound = Rounds.findOne({current: true});
    return currentRound.state === VOTING;
  },
  performingAction: function() {
    var currentRound = Rounds.findOne({current: true});
    return currentRound.state === ACTION;
  },
  gettingFeedback: function() {
    var currentRound = Rounds.findOne({current: true});
    return currentRound.state === FEEDBACK;
  }
});