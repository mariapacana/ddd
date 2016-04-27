STARTING = 0;
VOTING = 1;
ACTION = 2;
FEEDBACK = 3;
ENDING = 4;

MAX_ROUNDS = 19;

performersByMode = {
  "solo": ["ramona"],
  "versus": ["ramona", "manager"],
  "coop": ["ramonaworker"],
  "versus-group": ["managers", "workers"],
  "coop-group": ["managersworkers"]
}

performerNameDisplay = {
  "ramona": "Ramona",
  "ramonaworker": "Ramona and Worker",
  "manager": "Manager",
  "managers": "Managers",
  "workers": "Workers",
  "managersworkers": "Managers and Workers"
}

SEED_LEVELS = [{count: 1, mode: "solo", lastRound: 7, played: false},
               {count: 2, mode: "coop", lastRound: 11, played: false},
               {count: 3, mode: "versus", lastRound: 15, played: false},
               {count: 4, mode: "versus-group", lastRound: 18, played: false},
               {count: 5, mode: "finale", lastRound: 19, played: false}];

SEED_ROUNDS = [{roundCount: 1, current: true, level: 1, mode: "solo", state: STARTING},
               {roundCount: 2, current: false, level: 1, mode: "solo", state: VOTING},
               {roundCount: 3, current: false, level: 1, mode: "solo", state: VOTING},
               {roundCount: 4, current: false, level: 1, mode: "solo", state: VOTING},
               {roundCount: 5, current: false, level: 1, mode: "solo", state: VOTING},
               {roundCount: 6, current: false, level: 1, mode: "solo", state: VOTING},
               {roundCount: 7, current: false, level: 1, mode: "solo", state: VOTING},
               {roundCount: 8, current: false, level: 1, mode: "solo", state: VOTING},
               {roundCount: 9, current: false, level: 1, mode: "solo", state: VOTING},
               {roundCount: 10, current: false, level: 2, mode: "coop", state: VOTING},
               {roundCount: 11, current: false, level: 2, mode: "coop", state: VOTING},
               {roundCount: 12, current: false, level: 3, mode: "versus", state: VOTING},
               {roundCount: 13, current: false, level: 3, mode: "versus", state: VOTING},
               {roundCount: 14, current: false, level: 3, mode: "versus", state: VOTING},
               {roundCount: 15, current: false, level: 3, mode: "versus", state: VOTING},
               {roundCount: 16, current: false, level: 4, mode: "versus-group", state: VOTING},
               {roundCount: 17, current: false, level: 4, mode: "versus-group", state: VOTING},
               {roundCount: 18, current: false, level: 4, mode: "versus-group", state: VOTING},
               {roundCount: 19, current: false, level: 5, mode: "finale", state: VOTING}];

SEED_OPTIONS = [{round: 1, text: "apology"},
               {round: 2, text: "side planking"},
               {round: 2, text: "foam roller walking"},
               {round: 2, text: "hula hooping"},
               {round: 3, text: "standing on one leg"},
               {round: 3, text: "work faces"},
               {round: 3, text: "feather fortune-telling"},
               {round: 4, text: "lip synch"},
               {round: 4, text: "ukulele"},
               {round: 4, text: "singing Happy Birthday"},
               {round: 5, text: "auctioneering"},
               {round: 5, text: "feather balancing"},
               {round: 5, text: "balloons in the air"},
               {round: 6, text: "mining"},
               {round: 6, text: "miming"},
               {round: 6, text: "bubble-blowing"},
               {round: 7, text: "3-dimensional meditation"},
               {round: 7, text: "charging into battle"},
               {round: 7, text: "best friend maker"},
               {round: 8, text: "compliments"},
               {round: 8, text: "bubbles"},
               {round: 8, text: "casting a spell"},
               {round: 9, text: "levitating"},
               {round: 9, text: "balloons in the air"},
               {round: 9, text: "flying"},
               {round: 10, text: "lullaby"},
               {round: 10, text: "advice"},
               {round: 10, text: "dance routine"},
               {round: 11, text: "blind/deaf drawing"},
               {round: 11, text: "bowling backwards"},
               {round: 11, text: "contact improvisation"},
               {round: 12, text: "gum bubble-blowing"},
               {round: 12, text: "side planking"},
               {round: 12, text: "memory palaces"},
               {round: 13, text: "worst work story-off"},
               {round: 13, text: "word reclamation"},
               {round: 13, text: "poetry"},
               {round: 14, text: "balloon animals"},
               {round: 14, text: "guessing an unknown object"},
               {round: 14, text: "balloon-off"},
               {round: 15, text: "project runway"},
               {round: 15, text: "sculpture"},
               {round: 15, text: "hula hoop-off"},
               {round: 16, text: "dance routine redux"},
               {round: 16, text: "telephone"},
               {round: 16, text: "the wave"},
               {round: 17, text: "body calligraphy"},
               {round: 17, text: "harmonizing"},
               {round: 17, text: "human zoo"},
               {round: 18, text: "vertical dodgeball"},
               {round: 18, text: "contacting the president"},
               {round: 19, text: "demoted"},
               {round: 19, text: "fired"},
               {round: 19, text: "promoted"}];