Template.winner.helpers({
  winner: function() {
    var lastRound;
    if (this.roundCount && this.roundCount >= 2) {
      lastRound = Rounds.findOne({roundCount: this.roundCount-1});
      return lastRound && lastRound.winner;
    }
  }
});