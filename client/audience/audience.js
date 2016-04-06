Template.audience.onRendered(function() {
  Session.set('showInvite', true);
});

Template.audience.helpers({
  'userShouldBeInvited': function() {
    return userShouldBeInvited(Meteor.userId(), this.roundCount)
      && Session.get('showInvite', true);
  }
});