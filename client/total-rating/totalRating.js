Template.total_rating.helpers({
  performerAndRating: function() {
    return totalPerformerData(this);
  },
  levelText: function() {
    return this.count;
  },
  scoreText: function() {
    return (this.mode === "solo" || this.mode === "coop") ? "Score" : "Scores";
  }
});

Template._total_rating.helpers({
  performer: function() {
    return (this.performer) ? performerNameDisplay[this.performer] : '';
  },
  performerRating: function() {
    return this.rating;
  }
});