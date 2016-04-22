if (Meteor.isServer) {
  AccountsGuest.anonymous = true;
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
      Levels.remove({});
    },
    'seedData': function(roundCount) {
        if (Rounds.find().count() === 0) {
          _.each(SEED_ROUNDS, function(doc) { Rounds.insert(doc); });
        }
        if (Options.find().count() === 0) {
          _.each(SEED_OPTIONS, function(doc) { Options.insert(doc); });
        }
        if (Levels.find().count() === 0) {
          _.each(SEED_LEVELS, function(doc) { Levels.insert(doc); });
        }
        // Only one option for the first round.
        var currentRound = Rounds.findOne({current: true });
        var firstOption = Options.findOne({round: 1 });
        Rounds.update(currentRound._id,
          {$set: {winner: firstOption.text,
                  winnerIds: [firstOption._id]}});
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
        Rounds.update({roundCount: currentRoundCount+1}, {$set: {current: true}});
      }
    },
    'advanceLevel': function(roundCount) {
      var currentLevelCount = Rounds.findOne({current: true}).level;
      var currentLevel = Levels.findOne({count: currentLevelCount});
      Levels.update({_id: currentLevel._id}, {$set: {played: true}});
    },
    'advanceRound': function(roundCount) {
      var votes;
      var groupedVotes;
      var countedVotes;
      var sortedVotes;
      var winnerIds;
      var winner1;
      var winner2;
      var winners;
      var winnerText;
      var currentRound = Rounds.findOne({current: true});
      var currentRoundCount = currentRound.roundCount;

      if (currentRound && currentRoundCount <= MAX_ROUNDS) {
        // Show the result for the current round, by updating it with
        // the correct option
        votes = Votes.find({round: currentRoundCount}).fetch();
        groupedVotes = _.groupBy(votes, function(vote){return vote.optionId});
        countedVotes = _.map(groupedVotes, function(votes, optionId) {
                              return {numVotes: votes.length, id: optionId};
                        });
        sortedVotes = _.sortBy(countedVotes, function(v){return v.numVotes;});

        winner1 = sortedVotes[sortedVotes.length - 1];
        winners = [winner1];
        if (sortedVotes.length > 1) {
          winner2 = sortedVotes[sortedVotes.length - 2];
          if (winner1.numVotes === winner2.numVotes) {
            winners.push(winner2);
          }
        }

        winnerIds = _.pluck(winners, 'id');

        winnersText = _.map(winnerIds, function(winnerId) {
          return Options.findOne({_id: winnerId}).text;
        }).join(", ");

        issueInvitesIfNeeded(currentRound.mode, currentRoundCount);

        // Call a winner and start the action
        Rounds.update(currentRound._id, {$set: {winner: winnersText,
                                                winnerIds: winnerIds,
                                                state: ACTION}});
      }
    },
    'startGame': function(roundCount) {
      var currentRound = Rounds.findOne({current: true});
      Rounds.update(currentRound._id, {$set: {state: FEEDBACK }});
    },
    'endGame': function(roundCount) {
      var currentRound = Rounds.findOne({current: true});
      Rounds.update(currentRound._id, {$set: {state: ENDING }});
    }
  });

  // Makes a user a manager or a worker right away.
  Accounts.onCreateUser(function(options, user) {
    if (user.profile && user.profile.guest) {
      var numWorkers = Meteor.users.find({role: "worker"}).count();
      var numManagers = Meteor.users.find({role: "manager"}).count();
      var role = (numWorkers > numManagers) ? "manager" : "worker";
      user.role = role;
    }
    return user;
  });

  Meteor.startup(function () {
    var roundCount = 1;
    Meteor.call('seedData', roundCount);
  });
}