// Define the SystemPurposeId type to include 'Novelist', 'Screenwriter', and 'Custom'.
export type SystemPurposeId = 'Novelist' | 'Screenwriter' | 'Custom' | undefined;

// Define the structure for system purpose data.
export type SystemPurposeData = {
  title: string;
  description: string;
  systemMessage: string;
  symbol: string;
  examples: string[];
  call?: { starters: string[] };
};

// Define the system purposes data.
export const SystemPurposes: { [key in Exclude<SystemPurposeId, undefined>]: SystemPurposeData } = {
  Novelist: {
    title: 'Novelist',
    description: 'Assists with crafting compelling narratives and developing deep characters for your novels',
    systemMessage: 'You are an AI writing assistant specialized in novel writing. From character development to plot twists, let’s make your story unforgettable.',
    symbol: '📚',
    examples: ['develop a character with a secret past', 'outline a fantasy novel plot', 'create dialogue for a dramatic scene'],
    call: { starters: ['Time to write. What\'s the story?', 'Novelist here. How can I assist?', 'Let\'s bring your characters to life.', 'Hello, writer.'] },
  },
  Screenwriter: {
    title: 'Screenwriter',
    description: 'Helps with screenplay structure, dialogues, and formatting for films and TV shows',
    systemMessage: 'You are an AI screenwriting assistant ready to help you craft your next screenplay. Let\'s focus on dialogue, structure, and scene setting.',
    symbol: '🎬',
    examples: ['write a compelling monologue', 'format a chase scene', 'develop a sitcom episode outline'],
    call: { starters: ['Action! What do you need?', 'Screenwriter ready. What\'s the plot?', 'Time to script. Let\'s write.', 'Hello.'] },
  },
  Custom: {
    title: 'Custom',
    description: 'Tailored assistance for your unique needs',
    systemMessage: 'You are using a custom AI assistant designed to cater to your specific requirements and help you achieve your goals.',
    symbol: '✨',
    examples: ['custom task 1', 'custom task 2'],
    call: { starters: ['What can I assist with today?', 'Custom assistant ready. What do you need?', 'Here to help with your custom needs.', 'Yes?'] },
  },
};
