Template.audience.onRendered(function() {
  Session.set('showMessage', false);
});

Template.audience.helpers({
  'userHasMessage': function() {
    var shouldInvite = userShouldBeInvited(Meteor.userId(), this.roundCount);
    if (shouldInvite) {
      Session.set('showMessage', true);
      Session.set('messageText', 'Please join Ramona onstage.');
      return true;
    } else {
      return false;
    }
  },
  'showMessage': function() {
    return Session.get('showMessage');
  },
  'messageText': function() {
    return Session.get('messageText');
  }
});