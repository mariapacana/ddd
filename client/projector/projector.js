Template.projector.helpers({
  totalRating: function() {
    var ratings;
    var ratingValues;
    var ratingSum;
    var average = "Not Ready";

    ratings = Ratings.find().fetch();
    ratingValues = _.pluck(ratings, 'value');
    if (ratingValues.length !== 0) {
      ratingSum = ratingValues.reduce(function(a, b) { return a + b; });
      average = ratingSum / ratingValues.length;
    }

    return average;
  }
});