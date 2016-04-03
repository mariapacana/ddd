averageRating = function  (currentRound, isCumulative) {
  var ratings;
  var ratingValues;
  var ratingSum;
  var average = "Not Ready";
  var selector = isCumulative
    ? {}
    : {roundCount: currentRound.roundCount};

  if (currentRound.roundCount && currentRound.roundCount >= 1) {
    ratings = Ratings.find(selector).fetch();
    ratingValues = _.pluck(ratings, 'value');
    if (ratingValues.length !== 0) {
      ratingSum = ratingValues.reduce(function(a, b) { return a + b; });
      average = ratingSum / ratingValues.length;
    }
  }

  return Math.round(average);
}