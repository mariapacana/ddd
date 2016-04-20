Template.currentRating.helpers({
  performerAndRating: function() {
    return performerData(this);
  },
  scoreText: function() {
    return (this.mode === "solo" || this.mode === "coop") ? "score" : "scores";
  }
});

Template._currentRating.helpers({
  performer: function() {
    return (this.performer) ? performerNameDisplay[this.performer] : '';
  },
  performerRating: function() {
    return this.rating;
  }
});