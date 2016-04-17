Template.currentRating.helpers({
  performerAndRating: function() {
    return performerData(this);
  }
});

Template._currentRating.helpers({
  performer: function() {
    switch (this.performer) {
      case 'ramona':
        return "Ramona";
      case 'ramonaworker':
        return "Ramona and Worker";
      case 'manager':
        return "Manager";
    }
  },
  performerRating: function() {
    return this.rating;
  }
});