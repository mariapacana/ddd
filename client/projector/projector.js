Template.projector.helpers({
  totalRating: function() {
    var totalRating = averageRating(this, "ramona", true);
    return (totalRating === "not ready")
      ? "Not Ready"
      : totalRating;
  }
});