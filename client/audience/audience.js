Template.audience.helpers({
  currentRound: function() {
    var currentRound = Rounds.findOne({current: true});
    return currentRound;
  },
  needsFeedback: function(feedback) {
    return feedback === 1;
  },
  needsVotes: function(feedback) {
    return feedback === 2;
  }
});