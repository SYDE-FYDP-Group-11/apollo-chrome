const indicators = {
  "highCoverage": { 
    "name": "topic coverage",
    "type": "bool",
    "bool_copy": "high_low"
  },
  "highPublisherQuality": {
    "name": "publisher quality",
    "type": "bool",
    "bool_copy": "high_low"
  },
  "publisherBias": {
    "name": "publisher bias",
    "type": "left_right"
  },
  "notSatire": {
    "name": "satire",
    "type": "single_word"
  },
  "evidenceCited": {
    "name": "suspicious",
    "type": "bool",
    "bool_copy": "sus"
  },
  "authorVerified": {
    "name": "author",
    "type": "bool",
    "bool_copy": "verif_unverif"
  },
  "imagesManipulated": {
    "name": "manipulated images(s)",
    "type": "count_found"
  },
  "urlNotSuspicious": {
    "name": "URL",
    "type": "bool",
    "bool_copy": "sus"
  },
  "headlineNotSuspicious": {
    "name": "headline",
    "type": "bool",
    "bool_copy": "sus"
  }
};

const boolCopy = {
  "high_low": {
    true: "high",
    false: "low"
  },
  "sus": {
    true: "not suspicious",
    false: "suspicious"
  },
  "verif_unverif": {
    true: "verified",
    false: "unverified"
  }
};

const leftRightCopy = ["Left leaning", "Neutral", "Right leaning"];
