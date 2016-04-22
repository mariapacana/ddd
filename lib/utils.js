averageRating = function(roundCount, performer, isCumulative, level) {
  debugger;
  var ratings;
  var ratingValues;
  var ratingSum;
  var average = "not ready";
  var selector = isCumulative
    ? {level: level,
       performer: performer}
    : {roundCount: roundCount,
       performer: performer};

  if (roundCount && roundCount >= 1) {
    ratings = Ratings.find(selector).fetch();
    ratingValues = _.pluck(ratings, 'value');
    if (ratingValues.length !== 0) {
      ratingSum = ratingValues.reduce(function(a, b) { return a + b; });
      average = Math.round(ratingSum / ratingValues.length);
    }
  }

  return average;
}

totalPerformerData = function(level) {
  var performersInLevel = performersByMode[level.mode];

  return _.map(performersInLevel, function(performer) {
    return {
      "performer": performer,
      "rating": averageRating(level.lastRound, performer, true, level.count)
    };
  });
}

performerData = function(currentRound) {
  var currentRoundMode = currentRound.mode;
  var performersInRound = performersByMode[currentRoundMode];

  return _.map(performersInRound, function(performer) {
    return {
      "performer": performer,
      "rating": averageRating(currentRound.roundCount, performer, false)
    };
  });
}

userHasVotedInCurrentRound = function(currentRoundCount, performer) {
  var userId = Meteor.userId();
  var count = Ratings.find({'userId': userId,
                            'roundCount': currentRoundCount,
                            'performer': performer}).count();

  return count > 0;
}

// XXX: MAKE THIS FUNCTIONAL.
userHasVotedForAllPlayersInCurrentRound = function(currentRound) {
  var currentMode = currentRound.mode;
  if (currentMode === 'versus') {
    return userHasVotedInCurrentRound(currentRound.roundCount, 'ramona')
           && userHasVotedInCurrentRound(currentRound.roundCount, 'manager');
  } else if (currentMode === 'coop') {
    return userHasVotedInCurrentRound(currentRound.roundCount, 'ramonaworker');
  } else if (currentMode === 'group') {
    return userHasVotedInCurrentRound(currentRound.roundCount, 'managers')
      && userHasVotedInCurrentRound(currentRound.roundCount, 'workers');
  } else {
    return userHasVotedInCurrentRound(currentRound.roundCount, 'ramona');
  }
}

userShouldBeInvited = function(userId, currentRoundCount) {
  return Invites.findOne({userId: userId,
                          round: currentRoundCount,
                          state: "invited" });
}

currentRoundWinner = function(currentRound) {
  return Options.findOne({text: currentRound.winner});
}

notAdminSelector = function() {
  return { 'profile.guest': true };
}

isWorkerSelector = function() {
  return { 'role': 'worker' };
}

isManagerSelector = function() {
  return { 'role': 'manager'};
}

allPlayers = function() {
  return Meteor.users.find(notAdminSelector()).fetch();
}

allWorkers = function() {
  return Meteor.users.find(_.extend(notAdminSelector(), isWorkerSelector())).fetch();
}

allManagers = function() {
  return Meteor.users.find(_.extend(notAdminSelector(), isManagerSelector())).fetch();
}

getUserIds = function(users) {
  return _.pluck(users, '_id');
}

getInvitableIds = function(mode) {
  return getUserIds(allPlayers());
  // if (mode === "versus") {
  //   return getUserIds(allManagers());
  // } else if (mode === "coop") {
  //   return getUserIds(allWorkers());
  // }
  // return [];
}

issueInvitesIfNeeded = function(mode, currentRoundCount) {
  if (mode === "versus" || mode === "coop") {
    var invitableIds = getInvitableIds(mode);
    issueInvite(_.sample(invitableIds), currentRoundCount);
  }
}

issueInvite = function(userId, roundCount) {
  Invites.insert({ userId: userId,
                   round: roundCount,
                   state: "invited" });
}

declineInvite = function(inviteId) {
  Invites.update({_id: inviteId}, {$set: {state: "declined"}});
}

getDeclinedInvitees = function(currentRoundCount) {
  return _.pluck(Invites.find({round: currentRoundCount,
                               state: "declined"}).fetch(), 'userId');
}
