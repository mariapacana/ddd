Template.currentRating.helpers({
  performerAndRating: function() {
    return performerData(this);
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