if (Meteor.isServer) {
  Meteor.methods({
    'clearData': function() {
      Options.remove({});
      Ratings.remove({});
      Rounds.remove({});
      Votes.remove({});
    },
    'seedData': function(roundCount) {
        var options = SEED_OPTIONS;
        if (Rounds.find().count() === 0) {
          Rounds.insert({roundCount: roundCount,
                         current: true,
                         state: STARTING });
        }

        if (Options.find().count() === 0) {
          _.each(options, function(doc) {
            Options.insert(doc);
          });
        }
    },
    'getFeedback': function() {
      var currentRound = Rounds.findOne({current: true });
      Rounds.update({_id: currentRound._id}, {$set: {state: FEEDBACK}});
    },
    'getVotes': function() {
      var currentRound = Rounds.findOne({current: true});
      var currentRoundCount = currentRound.roundCount;
      if (currentRound.state === STARTING) {
        Rounds.update({_id: currentRound._id}, {$set: {state: VOTING}});
      } else {
        Rounds.update({_id: currentRound._id}, {$set: {current: false}});
        Rounds.insert({roundCount: currentRoundCount+1,
                       current: true,
                       state: VOTING});
      }
    },
    'advanceRound': function(roundCount) {
      var votes;
      var groupedVotes;
      var countedVotes;
      var sortedVotes;
      var winnerId;
      var winner;
      var currentRound = Rounds.findOne({current: true});
      var currentRoundCount = currentRound.roundCount;

      if (currentRound && currentRound.roundCount <= MAX_ROUNDS) {
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

        // Call a winner and start the action
        Rounds.update(currentRound._id, {$set: {winner: winner,
                                                state: ACTION}});
      }
    },
    'endGame': function(roundCount) {
      var currentRound = Rounds.findOne({current: true});
      Rounds.update(currentRound._id, {$set: {state: ENDING }});
    }
  });

  Meteor.startup(function () {
    var roundCount = 1;
    Meteor.call('seedData', roundCount);
  });
}