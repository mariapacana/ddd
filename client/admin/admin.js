Template.admin.helpers({
  needToStartGame: function() {
    return this.roundCount === 1 && this.state === STARTING;
  },
  needToEndGame: function() {
    return this.roundCount === MAX_ROUNDS && this.state === FEEDBACK;
  }
});

Template.admin.events({
  'click #startGame': function() {
    Meteor.call('startGame');
  },
  'click #getFeedback': function() {
    Meteor.call('getFeedback');
  },
  'click #getVotes': function() {
    Meteor.call('getVotes');
  },
  'click #advanceRound': function() {
    Meteor.call('advanceRound');
  },
  'click #advanceLevel': function() {
    Meteor.call('advanceLevel');
  },
  'click #endGame': function() {
    Meteor.call('endGame');
  }
});

Template.admin_game.helpers({
  needFeedback: function() {
    return this.state === ACTION;
  },
  needVotes: function() {
    return this.state === FEEDBACK && this.roundCount !== MAX_ROUNDS;
  },
  needToAdvance: function() {
    return this.state === VOTING;
  },
  needToAdvanceLevel: function() {
    var currentLevel = Levels.findOne({count: this.level});
    return (this.roundCount === currentLevel.lastRound && !currentLevel.played && this.state === FEEDBACK);
  }
})