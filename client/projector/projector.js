Template.projector.helpers({
  totalRating: function() {
    var totalRating = averageRating(this, true);
    return (totalRating === "not ready")
      ? "Not Ready"
      : totalRating;
  }
});