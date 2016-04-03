Template.rating.helpers({
  ratingOptions: [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10]
});

Template.rating.events({
  "change .selected-rating": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var rating = $(event.target).val();

    // Insert a rating
    if (!userHasVotedInCurrentRound(this.roundCount)) {
      Ratings.insert({
        roundCount: this.roundCount,
        value: parseInt(rating, 10),
        createdAt: new Date(), // current time,
        userId: Meteor.userId()
      });
    }
  }
});
