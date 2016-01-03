Template.restart.events({
  'click #restart': function() {
    console.log("restarted");
    var roundCount = 1;
    Meteor.call('clearData');
    Meteor.call('seedData', roundCount);
    Meteor.call('runGame',roundCount);
  }
});