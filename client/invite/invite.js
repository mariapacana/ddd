Template.invite.events({
  'click #consent': function() {
    Session.set('showInvite', false);
  },
});