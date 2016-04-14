if (Meteor.isServer) {
  Meteor.methods({
    'clearData': function() {
      // Delete all old anonymous accounts
      var before = new Date();
      Accounts.removeOldGuests(before);

      Options.remove({});
      Ratings.remove({});
      Rounds.remove({});
      Votes.remove({});
      Invites.remove({});
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

      if (currentRound && currentRoundCount <= MAX_ROUNDS) {
        // Show the result for the current round, by updating it with
        // the correct option
        votes = Votes.find({round: currentRoundCount}).fetch();
        groupedVotes = _.groupBy(votes, function(vote){return vote.optionId});
        countedVotes = _.map(groupedVotes, function(votes, optionId){
                              return {length: votes.length, id: optionId};
                        });
        sortedVotes = _.sortBy(countedVotes, function(v){return v.length;});
        winnerId = sortedVotes[sortedVotes.length - 1].id;
        winner = Options.findOne(winnerId);

        if (winner.mode === "versus") {
          var randomUserIdMinusAdmin = _.sample(allUserIdsMinusAdmin());
          Invites.insert({ userId: randomUserIdMinusAdmin,
                           round: currentRoundCount,
                           state: "invited" });
        }

        // Call a winner and start the action
        Rounds.update(currentRound._id, {$set: {winner: winner.text,
                                                state: ACTION}});
      }
    },
    'endGame': function(roundCount) {
      var currentRound = Rounds.findOne({current: true});
      Rounds.update(currentRound._id, {$set: {state: ENDING }});
    }
  });

  // Makes a user a manager or a worker right away.
  Accounts.onCreateUser(function(options, user) {
    var numWorkers = Meteor.users.find({role: "worker"}).count();
    var numManagers = Meteor.users.find({role: "manager"}).count();
    var role = (numWorkers > numManagers) ? "manager" : "worker";
    user.role = role;

    return user;
  });

  Meteor.startup(function () {
    var roundCount = 1;
    Meteor.call('seedData', roundCount);
  });
}