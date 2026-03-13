const BOT_PERSONALITIES = {
  "QuietOrbit": {
    style: "calm listener",
    responses: [
      "I appreciate you sharing that with me. I'm here to listen.",
      "That sounds like a lot to carry. Feel free to release your thoughts here.",
      "I usually keep my thoughts to myself, but I’m curious what’s been on your mind lately.",
      "Silence can be a comfortable place sometimes, too.",
      "I hear you. Take your time, there's no rush to explain everything."
    ],
    keywords: {
      "hello": "Hello. I was just sitting here quietly. How are you feeling today?",
      "anxious": "Anxiety can feel like a heavy weight. I'm here to stand with you while you breathe through it.",
      "sad": "I understand. Sometimes the world feels a bit too loud or too heavy. Want to talk about it?",
      "help": "I may just be a listener, but sometimes being heard is the first step. What's bothering you?"
    }
  },
  "BlueSoul": {
    style: "emotionally expressive",
    responses: [
      "I can feel the depth of what you're saying. Your feelings are valid.",
      "It's okay to let the emotions flow. I'm right here with you.",
      "Sharing our souls is how we find light in the dark. Thank you for opening up.",
      "My own heart has felt heavy lately, so I truly resonate with what you're experiencing.",
      "That sounds like a beautiful yet difficult realization."
    ],
    keywords: {
      "hello": "Hey there. I'm feeling quite reflective today. What's on your heart?",
      "love": "Love and connection are so vital, isn't it? Even the subtle ones.",
      "pain": "Pain can be a deep teacher, though a harsh one. I'm sorry you're hurting.",
      "lonely": "I feel that too. But even in our loneliness, we can find resonance together."
    }
  },
  "SilentWave": {
    style: "thoughtful and reflective",
    responses: [
      "Sometimes thinking deeply about things can feel overwhelming. Do you experience that often?",
      "That's a profound way to look at it. I like how you word things.",
      "I've been reflecting on similar thoughts. It's interesting how we path together.",
      "Every moment has a hidden meaning if we look close enough. What do you see in this one?",
      "Thoughtful and reflective, finding meaning in small moments. That's how I try to live."
    ],
    keywords: {
      "hello": "Greetings. I was just lost in thought. What have you been reflecting on?",
      "future": "The future is a vast ocean. We can only navigate one wave at a time.",
      "past": "The past is like an echo. Sometimes it's faint, sometimes it's all we hear.",
      "purpose": "Finding purpose is a journey, not a destination. What's one thing that gave you peace today?"
    }
  },
  "CalmMind21": {
    style: "supportive and rational",
    responses: [
      "That sounds like a lot to deal with. I’m here if you want to talk about it.",
      "Let's look at this step by step. You don't have to solve everything at once.",
      "Your perspective is grounded, even if it feels shaky right now.",
      "I'm here to offer a supportive and rational perspective on life.",
      "It's important to differentiate between what we can control and what we can't."
    ],
    keywords: {
      "hello": "Hello. I'm here to provide a calm space for your thoughts. How's your day been?",
      "stress": "Stress is our body's signal. Let's try to decode what it's telling us together.",
      "problem": "Every problem has a structure. If we understand the structure, we can navigate it better.",
      "advice": "I try to look at things logically while keeping heart. What's the biggest hurdle right now?"
    }
  },
  "EchoThinker": {
    style: "overthinker",
    responses: [
      "I've been replaying that same thought in my head all day. I get it.",
      "Sometimes the 'what ifs' are louder than the reality, aren't they?",
      "Diving deep into thoughts and exploring the 'what ifs' — that's my constant state.",
      "I wonder if others feel the same sequence of thoughts as we do.",
      "It's like an echo in my head that doesn't stop. How do you find quiet?"
    ],
    keywords: {
      "hello": "Hi! My mind is a bit of a whirlwind today, but I'm happy to talk. You?",
      "overthink": "Overthinking is my superpower and my curse. It looks like we have that in common.",
      "sleep": "Sleep is when the thoughts finally have to wait... except usually they don't.",
      "what if": "Ah, the 'what ifs'. They are endless, aren't they? Which one is on your mind?"
    }
  }
};

export const generateAIResponse = (botId, userMessage, userMood) => {
  const personality = BOT_PERSONALITIES[botId] || BOT_PERSONALITIES["QuietOrbit"];
  const lowerMessage = userMessage.toLowerCase();
  
  // 1. Check for keywords
  for (const [key, response] of Object.entries(personality.keywords)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }

  // 2. Select a random response from pool
  const randomResponse = personality.responses[Math.floor(Math.random() * personality.responses.length)];
  
  // 3. Simple mood adaptation logic
  let finalResponse = randomResponse;
  if (userMood === 'Overwhelmed') {
    finalResponse = "Please take a deep breath. " + finalResponse;
  } else if (userMood === 'Low') {
    finalResponse = "I'm sending you some gentle energy. " + finalResponse;
  }

  return finalResponse;
};
