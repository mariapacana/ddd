Template.winner.helpers({
  winner: function() {
    if (this.roundCount && this.roundCount >= 1) {
      var currentRound = Rounds.findOne({roundCount: this.roundCount});
      return currentRound && currentRound.winner;
    }
  }
});