Template.audience.helpers({
  currentRound: function() {
    var currentRound = Rounds.findOne({current: true});
    return currentRound;
  },
});