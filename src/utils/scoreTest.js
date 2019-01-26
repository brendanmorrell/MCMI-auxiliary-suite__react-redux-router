let temp;

const getScore = (results, {
  prototypal, neurotypal, isInconsistency, pairs,
}) => {
  temp = results;
  // change results from zero-indexed to match Q#
  results = [null].concat(results);
  if (isInconsistency) {
    const score = pairs.reduce(
      (acc, [first, second]) => (results[first] !== results[second] && results[first] !== '' && results[second] !== '' ? acc + 1 : acc),
      0,
    );
    return {
      isInconsistency,
      pairs,
      score: {
        base: score,
        disclosure: 0,
        ACC: 0,
        final: null,
      },
    };
  }
  const { True, False } = neurotypal;
  const protoScore = prototypal.reduce((acc, x) => (results[x] ? acc + 2 : acc), 0);
  const TrueScore = True.reduce((acc, x) => (results[x] ? acc + 1 : acc), 0);
  const FalseScore = False.reduce((acc, x) => (!results[x] && results[x] !== '' && results[x] !== null ? acc + 1 : acc), 0);

  return {
    prototypal,
    neurotypal: { True, False },
    score: {
      base: protoScore + TrueScore + FalseScore,
      disclosure: 0,
      ACC: 0,
      final: null,
    },
  };
};
const calculateScores = (results, scaleObj) => {
  const scoredScales = {};
  Object.keys(scaleObj).forEach(scale => (scoredScales[scale] = getScore(results, scaleObj[scale])));
  return scoredScales;
};
const disclosureAdjustment = (scores) => {
  const isSPP = {
    schizoid: true,
    avoidant: true,
    melancholic: true,
    dependent: true,
    histrionic: true,
    turbulent: true,
    narcissistic: true,
    antisocial: true,
    sadistic: true,
    compulsive: true,
    negativistic: true,
    masochistic: true,
  };
  const is18B = {
    schizotypal: true,
    borderline: true,
    paranoid: true,
    generalizedAnxiety: true,
    somaticSymptom: true,
    bipolarSpectrum: true,
    persistentDepression: true,
    alcoholUse: true,
    drugUse: true,
    ptsd: true,
    schizophrenicSpectrum: true,
    majorDepression: true,
    delusional: true,
  };
  let result = {};
  const baseAdjustmentValsArr = [
    { base: 7, '18B': 10, SPP: 5 },
    { base: 10, '18B': 9, SPP: 5 },
    { base: 9, '18B': 8, SPP: 4 },
    { base: 10, '18B': 7, SPP: 4 },
    { base: 11, '18B': 6, SPP: 3 },
    { base: 12, '18B': 5, SPP: 3 },
    { base: 14, '18B': 4, SPP: 2 },
    { base: 16, '18B': 3, SPP: 2 },
    { base: 18, '18B': 2, SPP: 1 },
    { base: 20, '18B': 1, SPP: 1 },
    { base: 60, '18B': 0, SPP: 0 },
    { base: 66, '18B': -1, SPP: -1 },
    { base: 71, '18B': -2, SPP: -1 },
    { base: 76, '18B': -3, SPP: -2 },
    { base: 82, '18B': -4, SPP: -2 },
    { base: 87, '18B': -5, SPP: -3 },
    { base: 93, '18B': -6, SPP: -3 },
    { base: 98, '18B': -7, SPP: -4 },
    { base: 104, '18B': -8, SPP: -4 },
    { base: 109, '18B': -9, SPP: -5 },
    { base: 114, '18B': -10, SPP: -5 },
  ];

  const { base: score } = scores.disclosure.score;
  let baseAdjustmentVal;
  if (score > 6 && score < 115) {
    for (let i = 0; i < baseAdjustmentValsArr.length; i++) {
      if (score < 7) break;
      const vals = baseAdjustmentValsArr[i];
      if (score <= vals.base) {
        baseAdjustmentVal = vals;
        break;
      }
    }
    for (let key in scores) {
      if (is18B[key]) {
        result[key] = {
          ...scores[key],
          score: {
            ...scores[key].score,
            disclosure: baseAdjustmentVal['18B'],
          },
        };
      } else if (isSPP[key]) {
        result[key] = {
          ...scores[key],
          score: {
            ...scores[key].score,
            disclosure: baseAdjustmentVal.SPP,
          },
        };
      } else {
        result[key] = scores[key];
      }
    }
  } else {
    result = { ...scores };
  }
  return result;
};
const baseRateScaleAdjustment = (scores) => {
  const anxietyScore =
    scores.melancholic.score.base + scores.masochistic.score.base + scores.borderline.score.base;
  const depressiveScore = scores.avoidant.score.base + scores.schizotypal.score.base;
  let ACCScore = 0;
  if (anxietyScore > 75) ACCScore += anxietyScore - 75;
  if (depressiveScore > 75) ACCScore += anxietyScore - 75;
  const adjustments = [
    { accValue: 4, anxiety: -1, depressive: -1 },
    { accValue: 9, anxiety: -2, depressive: -1 },
    { accValue: 14, anxiety: -3, depressive: -2 },
    { accValue: 19, anxiety: -4, depressive: -2 },
    { accValue: 29, anxiety: -5, depressive: -3 },
    { accValue: 39, anxiety: -6, depressive: -3 },
    { accValue: 49, anxiety: -7, depressive: -4 },
    { accValue: 59, anxiety: -8, depressive: -4 },
    { accValue: 69, anxiety: -9, depressive: -5 },
    { accValue: 80, anxiety: -10, depressive: -5 },
  ];
  if (ACCScore) {
    const adjustment = { anxiety: 0, depressive: 0 };
    for (let i = 0; i < adjustments.length; i++) {
      const elt = adjustments[i];
      if (elt.accValue >= ACCScore) {
        adjustment.anxiety = elt.anxiety;
        adjustment.depressive = elt.depressive;
        break;
      }
    }
    scores.melancholic.score.ACC = adjustment.anxiety;
    scores.masochistic.score.ACC = adjustment.anxiety;
    scores.borderline.score.ACC = adjustment.anxiety;

    scores.avoidant.score.ACC = adjustment.depressive;
    scores.schizotypal.score.ACC = adjustment.depressive;
  }
  return scores;
};
const getFinalScores = (scores) => {
  const result = {};
  for (const key in scores) {
    const elt = scores[key];
    const final = elt.score.base + elt.score.disclosure + elt.score.ACC;
    result[key] = { ...elt, score: { ...elt.score, final } };
    const j = { ...elt, score: { ...elt.score, final } };
  }
  return result;
};

const invalidityChecks = (scores) => {
  const oneThrough8B = [
    scores.schizoid.score.base,
    scores.avoidant.score.base,
    scores.melancholic.score.base,
    scores.dependent.score.base,
    scores.histrionic.score.base,
    scores.turbulent.score.base,
    scores.narcissistic.score.base,
    scores.antisocial.score.base,
    scores.sadistic.score.base,
    scores.compulsive.score.base,
    scores.negativistic.score.base,
    scores.masochistic.score.base,
  ];
  scores.invalidTest = {};
  if (scores.disclosure.score.base < 7 || scores.disclosure.score.final > 114) {
    scores.invalidTest.disclosure = true;
  }
  if (scores.inconsistency.score.base > 19) scores.invalidTest.inconsistency = true;
  if (scores.invalidity.score.base > 1) scores.invalidTest.invalidity = true;
  const allOneThrough8BUnder60 = oneThrough8B.every(score => score < 60);
  if (allOneThrough8BUnder60) scores.invalidTest.noClearPersonalityPattern = true;
  const blankQs = temp.reduce((acc, q) => q === '' ? acc + 1: acc, 0);
	if (blankQs > 13) scores.invalidTest.fourteenOrMoreBlankQuestions = true;
  
  return scores;
};
const scoringScale = {
  schizoid: {
    prototypal: [6, 15, 43, 90, 119, 139, 149, 180],
    neurotypal: { True: [17, 24, 70, 92, 190], False: [30, 154] },
  },
  avoidant: {
    prototypal: [5, 12, 26, 99, 135, 195],
    neurotypal: { True: [23, 24, 52, 92, 93, 112, 178, 184, 193], False: [46, 67, 154] },
  },
  melancholic: {
    prototypal: [23, 51, 71, 93, 111, 169, 175, 184, 193],
    neurotypal: { True: [17, 22, 39, 59, 70, 90, 126, 170, 178], False: [53] },
  },
  dependent: {
    prototypal: [4, 42, 60, 77, 109, 133, 162, 173, 194],
    neurotypal: { True: [5, 23, 72, 175], False: [67] },
  },
  histrionic: {
    prototypal: [10, 30, 46, 84, 117, 154, 171],
    neurotypal: { True: [8, 75, 155], False: [6, 15, 24, 26, 139, 178, 195] },
  },
  turbulent: {
    prototypal: [8, 20, 53, 75, 129, 155, 174, 185],
    neurotypal: { True: [30, 46, 67, 84, 142, 154], False: [26, 120, 178] },
  },
  narcissistic: {
    prototypal: [29, 38, 54, 67, 87, 106, 132, 142, 159, 189],
    neurotypal: { True: [10, 19, 83, 117, 171, 191], False: [] },
  },
  antisocial: {
    prototypal: [11, 19, 65, 83, 147, 183, 191],
    neurotypal: { True: [36, 38, 105, 152, 159], False: [48, 158] },
  },
  sadistic: {
    prototypal: [9, 50, 66, 97, 103, 115, 141, 152],
    neurotypal: { True: [11, 16, 21, 74, 145, 172], False: [] },
  },
  compulsive: {
    prototypal: [25, 35, 48, 63, 128, 140, 158, 179, 188],
    neurotypal: { True: [], False: [83, 147, 152] },
  },
  negativistic: {
    prototypal: [17, 32, 82, 96, 122, 137, 167, 187],
    neurotypal: { True: [21, 37, 52, 79, 88, 97, 100, 168, 172, 184], False: [] },
  },
  masochistic: {
    prototypal: [39, 59, 85, 100, 126, 166, 192],
    neurotypal: { True: [4, 12, 23, 70, 93, 156, 164, 178, 195], False: [20, 75] },
  },
  schizotypal: {
    prototypal: [13, 24, 44, 92, 112, 156, 165, 190],
    neurotypal: { True: [18, 58, 70, 90, 93, 121, 123, 126, 148, 163, 167, 172, 195], False: [] },
  },
  borderline: {
    prototypal: [16, 18, 37, 70, 134, 164, 178],
    neurotypal: { True: [4, 59, 80, 82, 93, 100, 111, 126, 137, 156, 166, 192, 193], False: [] },
  },
  paranoid: {
    prototypal: [21, 52, 79, 88, 104, 136, 153, 172],
    neurotypal: { True: [13, 24, 68, 96, 148, 167, 180, 195], False: [] },
  },
  generalizedAnxiety: {
    prototypal: [31, 72, 89, 113, 123, 143],
    neurotypal: { True: [33, 41, 44, 51, 91, 108, 109], False: [] },
  },
  somaticSymptom: {
    prototypal: [7, 28, 41, 120, 146],
    neurotypal: { True: [1, 57, 113, 118], False: [20] },
  },
  bipolarSpectrum: {
    prototypal: [3, 27, 56, 108, 163, 177],
    neurotypal: { True: [37, 50, 54, 82, 83, 105, 155], False: [] },
  },
  persistentDepression: {
    prototypal: [14, 34, 64, 118, 151, 170],
    neurotypal: {
      True: [17, 28, 39, 51, 71, 77, 85, 93, 101, 111, 114, 120, 178, 193],
      False: [75],
    },
  },
  alcoholUse: {
    prototypal: [25, 45, 94, 130, 161],
    neurotypal: { True: [65, 83, 126], False: [] },
  },
  drugUse: {
    prototypal: [36, 61, 81, 105, 116, 124, 144],
    neurotypal: { True: [11, 65, 152], False: [158] },
  },
  ptsd: {
    prototypal: [62, 76, 91, 125, 150],
    neurotypal: { True: [44, 47, 57, 74, 89, 110, 113, 143, 157], False: [] },
  },
  schizophrenicSpectrum: {
    prototypal: [33, 58, 80, 121, 131, 138],
    neurotypal: {
      True: [18, 24, 52, 82, 89, 92, 95, 104, 123, 136, 148, 156, 165, 172, 182],
      False: [],
    },
  },
  majorDepression: {
    prototypal: [1, 22, 57, 78, 101, 107, 114],
    neurotypal: { True: [28, 41, 59, 64, 70, 80, 111, 118, 120, 170], False: [] },
  },
  delusional: {
    prototypal: [68, 95, 127, 148, 182],
    neurotypal: { True: [13, 54, 79, 88, 112, 121, 136, 172, 189], False: [] },
  },
  invalidity: {
    prototypal: [],
    neurotypal: { True: [49, 98, 160], False: [] },
  },
  inconsistency: {
    isInconsistency: true,
    pairs: [
      [22, 170],
      [125, 143],
      [47, 157],
      [40, 181],
      [81, 116],
      [85, 126],
      [76, 150],
      [25, 94],
      [44, 121],
      [39, 59],
      [17, 184],
      [33, 89],
      [78, 164],
      [38, 171],
      [74, 115],
      [46, 154],
      [26, 99],
      [20, 174],
      [32, 122],
      [13, 112],
      [55, 110],
      [173, 194],
      [95, 127],
      [60, 162],
      [15, 149],
    ],
  },
  disclosure: {
    prototypal: [],
    neurotypal: {
      True: [
        2,
        4,
        5,
        6,
        8,
        9,
        10,
        11,
        12,
        15,
        16,
        17,
        19,
        20,
        21,
        22,
        23,
        24,
        26,
        29,
        30,
        32,
        35,
        36,
        37,
        38,
        39,
        42,
        43,
        46,
        48,
        50,
        51,
        52,
        53,
        54,
        59,
        60,
        63,
        65,
        66,
        67,
        70,
        71,
        72,
        73,
        74,
        75,
        77,
        79,
        82,
        83,
        84,
        85,
        87,
        88,
        90,
        92,
        93,
        96,
        97,
        99,
        100,
        103,
        105,
        106,
        109,
        111,
        112,
        115,
        117,
        119,
        120,
        122,
        126,
        128,
        129,
        132,
        133,
        135,
        137,
        139,
        140,
        141,
        142,
        145,
        147,
        149,
        152,
        154,
        155,
        156,
        158,
        159,
        162,
        164,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        174,
        175,
        178,
        179,
        180,
        183,
        184,
        185,
        187,
        188,
        189,
        190,
        191,
        192,
        193,
        194,
        195,
      ],
      False: [],
    },
  },
  desirability: {
    prototypal: [],
    neurotypal: {
      True: [2, 3, 8, 20, 30, 46, 67, 73, 75, 84, 154, 155, 158, 173, 174, 185, 188],
      False: [65, 71, 90, 99, 159, 162, 187],
    },
  },
  debasement: {
    prototypal: [],
    neurotypal: {
      True: [
        1,
        14,
        16,
        17,
        18,
        22,
        28,
        31,
        32,
        34,
        37,
        39,
        41,
        44,
        51,
        64,
        74,
        78,
        80,
        101,
        107,
        109,
        112,
        113,
        120,
        151,
        164,
        170,
        178,
        193,
      ],
      False: [],
    },
  },
};

// add possibility to score if up to 14 are missing or double marked (unscorable)
export default scores =>
  invalidityChecks(getFinalScores(baseRateScaleAdjustment(disclosureAdjustment(calculateScores(scores, scoringScale)))));
