Template.admin.helpers({
  currentRound: function() {
    var currentRound = Rounds.findOne({current: true});
    return currentRound;
  },
});

Template.admin.events({
  'click #advanceRound': function() {
    Meteor.call('advanceRound');
  }
});