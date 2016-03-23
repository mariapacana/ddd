Template.rating.onRendered(function () {
  // Always show form
  Session.set('showRatingForm', true);
});

Template.rating.helpers({
  ratingOptions: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
  showRatingForm: function() {
    return Session.get('showRatingForm') === true;
  }
});

Template.rating.events({
  "submit #ratingForm": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var rating = $(event.target).find("select").val();

    var currentRound = Rounds.findOne({roundCount: this.roundCount});

    var userId = Meteor.userId();

    var count = Ratings.find({'userId': userId,
                              'roundCount': this.roundCount}).count();

    // Insert a rating
    if (count === 0) {
      Ratings.insert({
        roundCount: currentRound.roundCount,
        value: parseInt(rating, 10),
        createdAt: new Date(), // current time,
        userId: userId
      });
    }

    Session.set("showRatingForm", false);
  }
});
