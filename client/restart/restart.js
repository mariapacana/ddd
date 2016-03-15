Template.restart.events({
  'click #restart': function() {
    var roundCount = 1;
    Meteor.call('clearData');
    Meteor.call('seedData', roundCount);
  }
});