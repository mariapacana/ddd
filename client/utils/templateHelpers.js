Template.registerHelper('currentRound', function() {
  var currentRound = Rounds.findOne({current: true});
  return currentRound;
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

Template.registerHelper('isManager', function() {
  var role = Meteor.users.findOne({_id: Meteor.userId()}).role;
    return role === "manager";
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
  return this.roundCount === MAX_ROUNDS && this.state === ENDING;
});

Template.registerHelper('submittedRating', function() {
  return userHasVotedForAllPlayersInCurrentRound(this);
});

Template.registerHelper('userShouldBeInvited', function() {
  return userShouldBeInvited(Meteor.userId(), this.roundCount);
})