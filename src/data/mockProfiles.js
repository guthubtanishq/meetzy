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
    id: "QuietOrbit",
    traits: ["Introvert", "Patient Listener"],
    preference: "Listener",
    moodId: 0,
    reason: "A calm presence that prefers to listen and understand.",
    isAI: true
  },
  {
    id: "BlueSoul",
    traits: ["Empath", "Emotionally Expressive"],
    preference: "Talker",
    moodId: 2,
    reason: "Looking for deep emotional resonance and shared feelings.",
    isAI: true
  },
  {
    id: "SilentWave",
    traits: ["High Sensitivity", "Reflective"],
    preference: "Mixed",
    moodId: 1,
    reason: "Thoughtful and reflective, finding meaning in small moments.",
    isAI: true
  },
  {
    id: "CalmMind21",
    traits: ["Structured", "Rational Support"],
    preference: "Listener",
    moodId: 0,
    reason: "Offering a supportive and rational perspective on life.",
    isAI: true
  },
  {
    id: "EchoThinker",
    traits: ["Overthinker", "Vivid Dreamer"],
    preference: "Mixed",
    moodId: 3,
    reason: "Diving deep into thoughts and exploring the 'what ifs'.",
    isAI: true
  },
  {
    id: "StillWater88",
    traits: ["Introvert", "Deep Thinker"],
    preference: "Mixed",
    moodId: 2,
    reason: "Comfortable silences and deep insights."
  },
  {
    id: "SoftPulse5",
    traits: ["ADHD", "Energetic Mind"],
    preference: "Talker",
    moodId: 1,
    reason: "Shared focus and dynamic energy."
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
