averageRating = function  (currentRound, isCumulative) {
  var ratings;
  var ratingValues;
  var ratingSum;
  var average = "not ready";
  var selector = isCumulative
    ? {}
    : {roundCount: currentRound.roundCount};

  if (currentRound.roundCount && currentRound.roundCount >= 1) {
    ratings = Ratings.find(selector).fetch();
    ratingValues = _.pluck(ratings, 'value');
    if (ratingValues.length !== 0) {
      ratingSum = ratingValues.reduce(function(a, b) { return a + b; });
      average = Math.round(ratingSum / ratingValues.length);
    }
  }

  return average;
}

userHasVotedInCurrentRound = function(currentRoundCount) {
  var userId = Meteor.userId();
  var count = Ratings.find({'userId': userId,
                            'roundCount': currentRoundCount}).count();

  return count > 0;
}

userShouldBeInvited = function(userId, currentRoundCount) {
  return Invites.findOne({userId: userId, round: currentRoundCount});
}