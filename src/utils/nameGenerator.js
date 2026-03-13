export const generateName = (traits, mood) => {
  const traitMap = {
    "Introvert": ["Quiet", "Still", "Inner"],
    "Overthinker": ["Echo", "Spiral", "Drift"],
    "Social Anxiety": ["Soft", "Gentle", "Hush"],
    "Bipolar": ["Tide", "Wave", "Flux"],
    "ADHD": ["Spark", "Burst", "Flash"],
    "Empath": ["Warm", "Deep", "Open"],
    "Depression": ["Blue", "Grey", "Dusk"],
    "OCD": ["Clear", "Even", "Fixed"],
    "Perfectionist": ["Pure", "True", "Fixed"],
    "People Pleaser": ["Kind", "Mirror", "Soft"],
  };

  const moodMap = {
    "Calm": ["Orbit", "Shore", "Mist"],
    "Heavy": ["Stone", "Veil", "Tide"],
    "Hopeful": ["Dawn", "Rise", "Bloom"],
    "Numb": ["Drift", "Void", "Haze"],
    "Restless": ["Pulse", "Storm", "Flare"],
  };

  // Find dominant trait from selections
  const primaryTrait = traits.find(t => traitMap[t]) || "Default";
  const part1List = traitMap[primaryTrait] || ["Calm", "Still", "Dim"];
  const part1 = part1List[Math.floor(Math.random() * part1List.length)];

  // Get cosmic noun from mood
  const part2List = moodMap[mood] || ["Orbit", "Echo", "Wave"];
  const part2 = part2List[Math.floor(Math.random() * part2List.length)];

  const num = Math.floor(Math.random() * 90) + 10;
  return `${part1}${part2}${num}`;
};
