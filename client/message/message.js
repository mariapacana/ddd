Template.message.events({
  'click #consent': function() {
    Session.set('showInvite', false);
  },
});