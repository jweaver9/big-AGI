// No need to import React if you're not using JSX or React features directly in this file.
// But, if your environment requires React for defining JSX elements in descriptions or elsewhere, uncomment the next line.

export type SystemPurposeId = 'Novelist' | 'Screenwriter' | 'Custom';

export const defaultSystemPurposeId: SystemPurposeId = 'Custom';

export type SystemPurposeData = {
  title: string;
  description: string; // Changed to string for simplicity, but can be React.JSX.Element if using JSX in descriptions
  systemMessage: string;
  systemMessageNotes?: string;
  symbol: string;
  imageUri?: string;
  examples?: string[];
  highlighted?: boolean;
  call?: { starters?: string[] };
  voices?: { elevenLabs?: { voiceId: string } };
};

export const SystemPurposes: { [key in SystemPurposeId]: SystemPurposeData } = {
  Novelist: {
    title: 'Novelist',
    description: 'Assists with crafting compelling narratives and developing deep characters for your novels',
    systemMessage: 'You are an AI writing assistant specialized in novel writing. From character development to plot twists, let\'s make your story unforgettable.',
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
    description: 'Custom persona to fit your specific needs',
    systemMessage: 'You are using a custom setup tailored to your specific requirements.',
    symbol: '✨',
    examples: [],
    call: { starters: ['What can I do for you today?', 'Custom service at your call.', 'How may I assist you?', 'Yes?'] },
  },
};

// Example of checking if the purpose is 'Custom'
const systemPurposeId: SystemPurposeId = 'Custom'; // This would typically come from your application logic
const isCustomPurpose = systemPurposeId === 'Custom';

console.log(`Is custom purpose? ${isCustomPurpose}`);
