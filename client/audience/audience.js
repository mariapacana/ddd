Template.audience.onRendered(function() {
  Session.set('showInvite', true);
});

Template.audience.helpers({
  'userShouldBeInvited': function() {
    return userShouldBeInvited(Meteor.userId(), this.roundCount)
      && Session.get('showInvite', true);
  },
  'inviteText': function() {
    return "Please join Ramona onstage!";
  },
  'isManager': function() {
    var role = Meteor.users.findOne({_id: Meteor.userId()}).role;
    return role === "manager";
  }
});