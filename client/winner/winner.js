Template.winner.onRendered(function() {
  if (userShouldBeInvited(Meteor.userId(), this.roundCount)) {
      Session.set('showMessage', true);
      Session.set('messageText', "Please join Ramona onstage");
  }
});

Template.winner.helpers({
  winner: function() {
    if (this.roundCount && this.roundCount >= 1) {
      var currentRound = Rounds.findOne({roundCount: this.roundCount});
      return currentRound && currentRound.winner;
    }
  }
});