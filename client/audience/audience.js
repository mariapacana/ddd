Template.audience.onRendered(function() {
  Session.set('showMessage', false);
});

Template.audience.helpers({
  'showMessage': function() {
    return Session.get('showMessage');
  },
  'messageText': function() {
    return Session.get('messageText');
  }
});