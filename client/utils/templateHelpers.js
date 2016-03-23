Template.registerHelper('currentRound', function() {
  var currentRound = Rounds.findOne({current: true});
  return currentRound;
});

Template.registerHelper('gettingVotes', function() {
  return this.state === VOTING;
});

Template.registerHelper('performingAction', function() {
  return this.state === ACTION;
});

Template.registerHelper('gettingFeedback', function() {
  return this.state === FEEDBACK;
});

Template.registerHelper('currentRoundWinner', function() {
  var currentRound;
  if (this.roundCount && this.roundCount >= 1) {
    currentRound = Rounds.findOne({roundCount: this.roundCount});
    return currentRound && currentRound.winner;
  } else {
    return false;
  }
});

Template.registerHelper('currentRoundRating', function() {
  var ratings;
  var ratingValues;
  var ratingSum;
  var average = "Not Ready";

  if (this.roundCount && this.roundCount >= 1) {
    ratings = Ratings.find({roundCount: this.roundCount}).fetch();
    ratingValues = _.pluck(ratings, 'value');
    if (ratingValues.length !== 0) {
      ratingSum = ratingValues.reduce(function(a, b) { return a + b; });
      average = ratingSum / ratingValues.length;
    }
  }

  return average;
});