const indicators = {
  "highCoverage": { 
    "name": "Topic coverage",
    "type": "bool",
    "bool_copy": "high_low"
  },
  "highPublisherQuality": {
    "name": "Publisher quality",
    "type": "bool",
    "bool_copy": "high_low"
  },
  "publisherBias": {
    "name": "Publisher bias",
    "type": "left_right"
  },
  "notSatire": {
    "name": "Satire",
    "type": "single_word"
  },
  "evidenceCited": {
    "name": "Evidence",
    "type": "bool",
    "bool_copy": "sus"
  },
  "authorVerified": {
    "name": "Author",
    "type": "bool",
    "bool_copy": "verif_unverif"
  },
  "imagesManipulated": {
    "name": "Manipulated image(s)",
    "type": "count_found"
  },
  "urlNotSuspicious": {
    "name": "URL",
    "type": "bool",
    "bool_copy": "sus"
  },
  "headlineNotSuspicious": {
    "name": "Headline",
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
