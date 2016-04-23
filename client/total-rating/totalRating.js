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
  },
  perfColor: function() {
    var color;
    if (typeof this.rating !== "number") {
      color = "white";
    } else {
      color = (this.rating < 90) ? "red" : "green";
    }
    return color;
  }
});