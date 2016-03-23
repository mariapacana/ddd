Template.admin.helpers({
  needToAdvance: function() {
    return this.state === VOTING;
  },
  needFeedback: function() {
    return this.state === ACTION;
  },
  needVotes: function() {
    return this.state == STARTING || this.state === FEEDBACK;
  }
});

Template.admin.events({
  'click #getFeedback': function() {
    Meteor.call('getFeedback');
  },
  'click #getVotes': function() {
    Meteor.call('getVotes');
  },
  'click #advanceRound': function() {
    Meteor.call('advanceRound');
  }
});