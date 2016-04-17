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
    declineInvite(inviteId);
    var currentRoundMode = Options.findOne({_id: this.winnerId}).mode;
    var invitableIds = _.difference(getInvitableIds(currentRoundMode),
                                    getDeclinedInvitees(this.roundCount));
    if (invitableIds.length > 0) {
      issueInvite(_.sample(invitableIds), this.roundCount);
    }

    Session.set('showMessage', false);
  },
});

Template.message.helpers({
  'messageText': function() {
    return Session.get('messageText');
  }
})