Template.audience.onRendered(function() {
  Session.set('showMessage', false);
});

Template.audience.helpers({
  'showMessage': function() {
    return Session.get('showMessage');
  },
  'messageText': function() {
    return Session.get('messageText');
  },
  'isManager': function() {
    var role = Meteor.users.findOne({_id: Meteor.userId()}).role;
    return role === "manager";
  }
});