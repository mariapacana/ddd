Template.message.events({
  'click #yes': function() {
    var inviteId = Invites.findOne({userId: Meteor.userId(),
                                    round: this.roundCount})._id;
    Invites.update({_id: inviteId}, {$set: {state: "accepted"}});
    Session.set('showMessage', false);
  },
  'click #no': function() {
    var inviteId = Invites.findOne({userId: Meteor.userId(),
                                    round: this.roundCount})._id;
    Invites.update({_id: inviteId}, {$set: {state: "declined"}});
    var declinedUsers = _.pluck(Invites.find({round: this.roundCount,
                            state: "declined"}).fetch(), 'userId');
    var allUsersMinusAdmin = allUserIdsMinusAdmin();
    var invitableUsers = _.difference(allUsersMinusAdmin, declinedUsers);
    if (invitableUsers.length > 0) {
      var randomUserId = _.sample(invitableUsers);
      Invites.insert({ userId: randomUserId,
                       round: this.roundCount,
                       state: "invited" });
    }
    Session.set('showMessage', false);
  },
});

Template.message.helpers({
  'messageText': function() {
    return Session.get('messageText');
  }
})