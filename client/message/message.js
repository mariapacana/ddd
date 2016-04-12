Template.message.events({
  'click #consent': function() {
    Session.set('showMessage', false);
  },
});