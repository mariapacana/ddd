Template.rating.helpers({
  ratingOptions: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
  lastLastRoundWinner: function() {
    var lastLastRound;
    if (this.roundCount && this.roundCount >= 3) {
      lastLastRound = Rounds.findOne({roundCount: this.roundCount-2});
      return lastLastRound && lastLastRound.winner;
    }
  },
  averageRating: function() {
    var ratings;
    var ratingValues;
    var ratingSum;
    var average = "Not Ready";

    if (this.roundCount && this.roundCount >= 3) {
      ratings = Ratings.find({roundCount: this.roundCount-2}).fetch();
      ratingValues = _.pluck(ratings, 'value');
      if (ratingValues.length !== 0) {
        ratingSum = ratingValues.reduce(function(a, b) { return a + b; });
        average = ratingSum / ratingValues.length;
      }
    }

    return average;
  }
});

Template.rating.events({
  "submit .rating": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var rating = $(event.target).find("select").val();

    var lastLastRound = Rounds.findOne({roundCount: this.roundCount-2});

    // Insert a rating
    Ratings.insert({
      roundCount: lastLastRound.roundCount,
      value: parseInt(rating, 10),
      createdAt: new Date() // current time
    });

    // Clear form
    $(event.target).find("submit").attr('disabled', true);
  }
});
