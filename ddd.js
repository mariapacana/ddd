if (Meteor.isClient) {
  Template.ddd.helpers({
    currentRound: function() {
      var currentRound = Rounds.findOne();
      return currentRound;
    },
  });
  Template.winner.helpers({
    winner: function() {
      var currentRound = Rounds.findOne();
      return currentRound && currentRound.winner;
    }
  });
  Template.options.helpers({
    options: function() {
      return Options.find({round: this.current});
    },
    optionVotes: function() {
      return Votes.find({optionId: this._id, round: this.round}).count();
    }
  });
  Template.options.events({
    'click .option': function(){
        var userId = Meteor.userId();
        var count = Votes.find({'optionId': this._id,
                                'userId': userId,
                                'round': this.round}).count();
        if (count === 0)
          Votes.insert({'userId': userId,
                        'optionId': this._id,
                        'round': this.round});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  var options = [{round: 1, text: "juggling"},
                 {round: 1, text: "singing"},
                 {round: 1, text: "levitating"},
                 {round: 2, text: "dancing"},
                 {round: 2, text: "finding the meaning of life"},
                 {round: 2, text: "getting prime factors"},
                 {round: 3, text: "dancing"},
                 {round: 3, text: "finding the meaning of life"},
                 {round: 3, text: "getting prime factors"}];

    if (Rounds.find().count() === 0) {
      Rounds.insert({current: 1});
    }
    if (Options.find().count() === 0) {
      _.each(options, function(doc) {
        Options.insert(doc);
      });
    }
  });

  Meteor.setInterval(function () {
    var max_rounds = 3;
    var votes;
    var groupedVotes;
    var countedVotes;
    var sortedVotes;
    var winnerId;
    var winner;
    var currentRound = Rounds.findOne();

    if (currentRound && currentRound.current <= max_rounds) {
      // Show the result for the current round, by updating it with
      // the correct option
      votes = Votes.find({round: currentRound.current}).fetch();
      groupedVotes = _.groupBy(votes, function(vote){return vote.optionId});
      countedVotes = _.map(groupedVotes, function(votes, optionId){
                            return {length: votes.length, id: optionId};
                      });
      sortedVotes = _.sortBy(countedVotes, function(v){return v.length;});
      winnerId = sortedVotes[sortedVotes.length - 1].id;
      winner = Options.findOne(winnerId).text;

      Rounds.update(currentRound._id, {$set: {winner: winner}});

      // Move to the next round
      Rounds.update({_id: currentRound._id}, {$inc: {current: 1}});
    } else {
      Rounds.remove({});
      Votes.remove({});
    }
  }, 10000);
}