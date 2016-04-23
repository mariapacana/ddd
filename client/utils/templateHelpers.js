Template.registerHelper('currentRound', function() {
  var currentRound = Rounds.findOne({current: true});
  return currentRound;
});

Template.registerHelper('gameNotStarted', function() {
  return this.roundCount === 1 && this.state === STARTING;
});

Template.registerHelper('gettingVotes', function() {
  return this.state === VOTING;
});

Template.registerHelper('performingAction', function() {
  return this.state === ACTION;
});

Template.registerHelper('gettingFeedback', function() {
  return this.state === FEEDBACK;
});

Template.registerHelper('currentLevel', function() {
  return currentLevel = Levels.findOne({count: this.level});
});

Template.registerHelper('endOfLevel', function() {
  var currentLevel = Levels.findOne({count: this.level});
  return (this.roundCount === currentLevel.lastRound && currentLevel.played && this.state === FEEDBACK);
});

Template.registerHelper('currentUserRole', function() {
  var currentUser = Meteor.users.findOne({_id: Meteor.userId()});
  return (currentUser && currentUser.role) ? currentUser.role : '...';
});

Template.registerHelper('currentRoundWinner', function() {
  var currentRound;
  if (this.roundCount && this.roundCount >= 1) {
    currentRound = Rounds.findOne({roundCount: this.roundCount});
    return currentRound && currentRound.winner;
  } else {
    return false;
  }
});

Template.registerHelper('currentRoundRating', function() {
  return averageRating(this);
});

Template.registerHelper('currentRoundCount', function() {
  return (this.roundCount) ? this.roundCount : null;
})

Template.registerHelper('gameOver', function() {
  return this.roundCount === MAX_ROUNDS &&
         this.mode === "finale" &&
         this.state === ENDING;
});

Template.registerHelper('submittedRating', function() {
  return userHasVotedForAllPlayersInCurrentRound(this);
});

Template.registerHelper('userShouldBeInvited', function() {
  return userShouldBeInvited(Meteor.userId(), this.roundCount);
})

Template.registerHelper('userIsAllowedToVote', function() {
  if (this.mode !== "finale") {
    return true;
  } else {
    var canVote = true;
    var currentUserRole = Meteor.users.findOne({_id: Meteor.userId()}).role;
    var lastLevel = Levels.findOne({count: 4});
    if (lastLevel.mode === "versus-group") {
      if ((lastLevel.winner === "managers" && currentUserRole !== "manager") ||
        (lastLevel.winner === "workers" && currentUserRole !== "worker")) {
        canVote = false;
      }
    }
    return canVote;
  }
})