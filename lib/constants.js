STARTING = 0;
VOTING = 1;
ACTION = 2;
FEEDBACK = 3;
ENDING = 4;

MAX_ROUNDS = 17;

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

SEED_ROUNDS = [{roundCount: 1, current: true, mode: "solo", state: STARTING},
               {roundCount: 2, current: false, mode: "solo", state: VOTING},
               {roundCount: 3, current: false, mode: "solo", state: VOTING},
               {roundCount: 4, current: false, mode: "solo", state: VOTING},
               {roundCount: 5, current: false, mode: "solo", state: VOTING},
               {roundCount: 6, current: false, mode: "solo", state: VOTING},
               {roundCount: 7, current: false, mode: "solo", state: VOTING},
               {roundCount: 8, current: false, mode: "solo", state: VOTING},
               {roundCount: 9, current: false, mode: "solo", state: VOTING},
               {roundCount: 10, current: false, mode: "coop", state: VOTING},
               {roundCount: 11, current: false, mode: "coop", state: VOTING},
               {roundCount: 12, current: false, mode: "versus", state: VOTING},
               {roundCount: 13, current: false, mode: "versus", state: VOTING},
               {roundCount: 14, current: false, mode: "versus", state: VOTING},
               {roundCount: 15, current: false, mode: "versus", state: VOTING},
               {roundCount: 16, current: false, mode: "group", state: VOTING},
               {roundCount: 17, current: false, mode: "group", state: VOTING}];

SEED_OPTIONS = [{round: 1, text: "apology"},
               {round: 2, text: "side planking"},
               {round: 2, text: "balancing on a bolster"},
               {round: 2, text: "hula hooping"},
               {round: 3, text: "standing on one leg"},
               {round: 3, text: "casting a spell"},
               {round: 3, text: "feather fortune-telling"},
               {round: 4, text: "karaoke"},
               {round: 4, text: "ukulele"},
               {round: 4, text: "singing Happy Birthday"},
               {round: 5, text: "levitating"},
               {round: 5, text: "feather balancing"},
               {round: 5, text: "cartwheel"},
               {round: 6, text: "writing poetry"},
               {round: 6, text: "auctioneering"},
               {round: 6, text: "best friend maker"},
               {round: 7, text: "mining"},
               {round: 7, text: "miming"},
               {round: 7, text: "bubble-blowing"},
               {round: 8, text: "flying"},
               {round: 8, text: "giving advice"},
               {round: 8, text: "3-dimensional meditation"},
               {round: 9, text: "work faces"},
               {round: 9, text: "singing a lullaby"},
               {round: 9, text: "dance routine"},
               {round: 10, text: "compliments"},
               {round: 10, text: "bubbles"},
               {round: 11, text: "blind/deaf painting"},
               {round: 11, text: "bowling backwards"},
               {round: 11, text: "contact improvisation"},
               {round: 12, text: "gum bubble"},
               {round: 12, text: "hacky sack-off"},
               {round: 13, text: "hula hoop-off"},
               {round: 13, text: "work work story-off"},
               {round: 13, text: "spelling bee"},
               {round: 14, text: "side planking"},
               {round: 14, text: "balloon animals"},
               {round: 14, text: "finding a lost object"},
               {round: 15, text: "sculpture"},
               {round: 15, text: "project runway"},
               {round: 15, text: "memory palaces"},
               {round: 16, text: "dance routine redux"},
               {round: 16, text: "telephone"},
               {round: 16, text: "the wave"},
               {round: 17, text: "harmonizing"},
               {round: 17, text: "vertical dodgeball"},
               {round: 17, text: "contacting the president"}];