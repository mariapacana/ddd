STARTING = 0;
VOTING = 1;
ACTION = 2;
FEEDBACK = 3;
ENDING = 4;

MAX_ROUNDS = 16;

performersByMode = {
  "solo": ["ramona"],
  "versus": ["ramona", "manager"],
  "coop": ["ramonaworker"],
  "group": ["managers", "workers"]
}

performerNameDisplay = {
  "ramona": "Ramona",
  "ramonaworker": "Ramona and Worker",
  "manager": "Manager",
  "managers": "Managers",
  "workers": "Workers"
}

SEED_OPTIONS = [{round: 1, text: "apology", mode: "solo"},
               {round: 1, text: "refusal", mode: "solo"},
               {round: 2, text: "side planking", mode: "solo"},
               {round: 2, text: "balancing on a bolster", mode: "solo"},
               {round: 2, text: "hula hooping", mode: "solo"},
               {round: 3, text: "standing on one leg", mode: "solo"},
               {round: 3, text: "casting a spell", mode: "solo"},
               {round: 3, text: "feather fortune-telling", mode: "solo"},
               {round: 4, text: "karaoke", mode: "solo"},
               {round: 4, text: "ukulele", mode: "solo"},
               {round: 4, text: "singing Happy Birthday", mode: "solo"},
               {round: 5, text: "levitating", mode: "solo"},
               {round: 5, text: "feather balancing", mode: "solo"},
               {round: 5, text: "cartwheel", mode: "solo"},
               {round: 6, text: "writing poetry", mode: "solo"},
               {round: 6, text: "auctioneering", mode: "solo"},
               {round: 6, text: "best friend maker", mode: "solo"},
               {round: 7, text: "mining", mode: "solo"},
               {round: 7, text: "miming", mode: "solo"},
               {round: 7, text: "bubble-blowing", mode: "solo"},
               {round: 8, text: "flying", mode: "solo"},
               {round: 8, text: "giving advice", mode: "solo"},
               {round: 8, text: "3-dimensional meditation", mode: "solo"},
               {round: 9, text: "work faces", mode: "solo"},
               {round: 9, text: "singing a lullaby", mode: "solo"},
               {round: 9, text: "dance routine", mode: "solo"},
               {round: 10, text: "compliments", mode: "coop"},
               {round: 10, text: "bubbles", mode: "coop"},
               {round: 11, text: "blind/deaf painting", mode: "coop"},
               {round: 11, text: "bowling backwards", mode: "coop"},
               {round: 11, text: "contact improvisation", mode: "coop"},
               {round: 12, text: "gum bubble", mode: "versus"},
               {round: 12, text: "hacky sack-off", mode: "versus"},
               {round: 13, text: "hula hoop-off", mode: "versus"},
               {round: 13, text: "work work story-off", mode: "versus"},
               {round: 13, text: "spelling bee", mode: "versus"},
               {round: 13, text: "side planking", mode: "versus"},
               {round: 13, text: "balloon animals", mode: "versus"},
               {round: 13, text: "finding a lost object", mode: "versus"},
               {round: 14, text: "sculpture", mode: "versus"},
               {round: 14, text: "project runway", mode: "versus"},
               {round: 14, text: "memory palaces", mode: "versus"},
               {round: 15, text: "dance routine redux", mode: "group"},
               {round: 15, text: "telephone", mode: "group"},
               {round: 15, text: "the wave", mode: "group"},
               {round: 16, text: "harmonizing", mode: "group"},
               {round: 16, text: "vertical dodgeball", mode: "group"},
               {round: 16, text: "contacting the president", mode: "group"}];