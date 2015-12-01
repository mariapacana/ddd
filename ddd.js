if (Meteor.isClient) {
  Template.ddd.helpers({
    currentRound: function() {
      var currentRound = Rounds.findOne({current: true});
      return currentRound;
    },
  });
  Template.winner.helpers({
    winner: function() {
      var lastRound;
      if (this.roundCount && this.roundCount >= 2) {
        lastRound = Rounds.findOne({roundCount: this.roundCount-1});
        return lastRound && lastRound.winner;
      }
    }
  });
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

  Template.options.helpers({
    options: function() {
      return Options.find({round: this.roundCount});
    },
    optionVotes: function() {
      return Votes.find({optionId: this._id, round: this.round}).count();
    }
  });
  Template.options.events({
    'click .option': function() {
        var userId = Meteor.userId();
        var count = Votes.find({'optionId': this._id,
                                'userId': userId,
                                'round': this.round}).count();
        if (count === 0)
          Votes.insert({'userId': userId,
                        'optionId': this._id,
                        'round': this.round});
    }
  });
  Template.restart.events({
    'click #restart': function() {
      console.log("restarted");
      var roundCount = 1;
      Meteor.call('clearData');
      Meteor.call('seedData', roundCount);
      Meteor.call('runGame',roundCount);
    }
  })
}

if (Meteor.isServer) {
  Meteor.methods({
    'clearData': function() {
      Options.remove({});
      Ratings.remove({});
      Rounds.remove({});
      Votes.remove({});
    },
    'seedData': function(roundCount) {
        var options = [{round: 1, text: "juggling"},
                       {round: 1, text: "singing"},
                       {round: 1, text: "levitating"},
                       {round: 2, text: "dancing"},
                       {round: 2, text: "finding the meaning of life"},
                       {round: 2, text: "getting prime factors"},
                       {round: 3, text: "swerving"},
                       {round: 3, text: "squiggling"},
                       {round: 3, text: "bouncing"},
                       {round: 4, text: "calculating"},
                       {round: 4, text: "relating"},
                       {round: 4, text: "prognosticating"}];

        if (Rounds.find().count() === 0) {
          Rounds.insert({roundCount: roundCount, current: true});
        }
        if (Options.find().count() === 0) {
          _.each(options, function(doc) {
            Options.insert(doc);
          });
        }
    },
    'runGame': function(roundCount) {
      Meteor.setInterval(function () {
        var max_rounds = 4;
        var votes;
        var groupedVotes;
        var countedVotes;
        var sortedVotes;
        var winnerId;
        var winner;
        var currentRound = Rounds.findOne({current: true});
        var currentRoundCount = currentRound.roundCount;
        var nextRoundCount = currentRoundCount+1;

        if (currentRound && currentRound.roundCount <= max_rounds) {
          // Show the result for the current round, by updating it with
          // the correct option
          votes = Votes.find({round: currentRound.roundCount}).fetch();
          groupedVotes = _.groupBy(votes, function(vote){return vote.optionId});
          countedVotes = _.map(groupedVotes, function(votes, optionId){
                                return {length: votes.length, id: optionId};
                          });
          sortedVotes = _.sortBy(countedVotes, function(v){return v.length;});
          winnerId = sortedVotes[sortedVotes.length - 1].id;
          winner = Options.findOne(winnerId).text;

          Rounds.update(currentRound._id, {$set: {winner: winner}});

          // Move to the next round
          Rounds.update({_id: currentRound._id}, {$set: {current: false}});
          Rounds.insert({roundCount: nextRoundCount, current: true});
        }
      }, 10000);
    }
  });

  Meteor.startup(function () {
    var roundCount = 1;
    Meteor.call('seedData', roundCount);
    Meteor.call('runGame',roundCount);
  });
}