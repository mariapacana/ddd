Template.rating.helpers({
  // XXX: Refactor
  performerData: function() {
    var self = this;
    var mode = currentRoundWinner(this).mode;
    var performers = performersByMode[mode];
    return _.map(performers, function(performer) {
      return {performer: performer, currentRoundCount: self.roundCount};
    });
  }
});

Template._rating.helpers({
  ratingOptions: ['Select', 100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10],
  performer: function() {
    return (this.performer) ? performerNameDisplay[this.performer] : '';
  }
});

Template._rating.events({
  "change .selected-rating": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var rating = $(event.target).val();
    var performer = this.performer;

    // Insert a rating
    if (!userHasVotedInCurrentRound(this.currentRoundCount, performer)) {
      Ratings.insert({
        roundCount: this.currentRoundCount,
        value: parseInt(rating, 10),
        createdAt: new Date(), // current time,
        userId: Meteor.userId(),
        performer: performer
      });
    }
  }
});