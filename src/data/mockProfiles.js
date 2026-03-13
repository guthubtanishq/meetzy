export const traitsList = [
  "Introvert", "Overthinker", "Social Anxiety", "Bipolar", "ADHD", 
  "Empath", "High Sensitivity", "Depression", "OCD", "PTSD",
  "Patient Listener", "Calm Personality", "Empathetic", "Structured", "Emotionally Stable"
];

export const compatibilityMap = {
  "Introvert": ["Patient Listener", "Calm Personality"],
  "Overthinker": ["Calm Personality", "Structured"],
  "Social Anxiety": ["Empathetic", "Understanding"],
  "Bipolar": ["Emotionally Stable Support", "Patient Listener"],
  "ADHD": ["Structured", "Calm Personality"],
  "Empath": ["Anyone who needs to be heard", "High Sensitivity"],
  "Depression": ["Gentle, non-pushy presence", "Empathetic"],
  "OCD": ["Non-judgmental, patient", "Structured"],
};

export const mockProfiles = [
  {
    id: "QuietOrbit72",
    traits: ["Introvert", "Patient Listener"],
    preference: "Listener",
    moodId: 1,
    reason: "They tend to listen without judgment."
  },
  {
    id: "BlueMind23",
    traits: ["Overthinker", "Vivid Dreamer"],
    preference: "Talker",
    moodId: 2,
    reason: "Deep reflections matching your active mind."
  },
  {
    id: "CalmTide9",
    traits: ["Calm Personality", "Emotionally Stable"],
    preference: "Mixed",
    moodId: 0,
    reason: "A grounding presence for intense days."
  },
  {
    id: "SilverEcho44",
    traits: ["Social Anxiety", "Empathetic"],
    preference: "Listener",
    moodId: 3,
    reason: "Finding comfort in shared sensitivity."
  },
  {
    id: "LunarSpirit11",
    traits: ["High Sensitivity", "Creative Soul"],
    preference: "Mixed",
    moodId: 4,
    reason: "Resonates with your emotional depth."
  },
  {
    id: "SoftPulse5",
    traits: ["ADHD", "Energetic Mind"],
    preference: "Talker",
    moodId: 1,
    reason: "Shared focus and dynamic energy."
  },
  {
    id: "OpenHorizon33",
    traits: ["Structured", "Clear Path"],
    preference: "Listener",
    moodId: 0,
    reason: "Offering clarity and gentle structure."
  },
  {
    id: "StillWater88",
    traits: ["Introvert", "Deep Thinker"],
    preference: "Mixed",
    moodId: 2,
    reason: "Comfortable silences and deep insights."
  }
];

export const getAnonymousId = () => {
  const adjectives = ["Quiet", "Silver", "Ethereal", "Calm", "Lunar", "Solar", "Ocean", "Orbit", "Mind", "Spirit", "Pulse", "Soft", "Deep", "Open"];
  const nouns = ["Orbit", "Echo", "Wave", "Shadow", "Light", "Cloud", "Meadow", "Valley", "Stone", "Feather", "Voyager", "Seed"];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 99);
  return `${adj}${noun}${num}`;
};
