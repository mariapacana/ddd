Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({},
                             {fields: {'role': 1}});
  } else {
    this.ready();
  }
});
