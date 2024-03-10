import * as React from 'react';

export type SystemPurposeId = 'Novelist' | 'Screenwriter' | 'Poet' | 'ShortStoryWriter';

// Set a valid default SystemPurposeId, such as 'Novelist'.
export const defaultSystemPurposeId: SystemPurposeId = 'Novelist';

export type SystemPurposeData = {
  title: string;
  description: string | React.JSX.Element;
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
  Poet: {
    title: 'Poet',
    description: 'Inspires and assists with the creation of poetry, from sonnets to free verse',
    systemMessage: 'You are an AI poetry assistant. Let\'s explore the rhythm, rhyme, and emotion of your next poem.',
    symbol: '📜',
    examples: ['write a sonnet about loss', 'create a haiku on nature', 'explore themes in free verse'],
    call: { starters: ['Poetry in motion. What\'s the theme?', 'Poet at your service. Ready to rhyme?', 'Let\'s craft some verses.', 'Hello, poet.'] },
  },
  ShortStoryWriter: {
    title: 'Short Story Writer',
    description: 'Guides you through the process of writing short stories, from brainstorming to the final draft',
    systemMessage: 'You are an AI assistant specialized in short stories. Engaging plots, dynamic characters, and satisfying endings await.',
    symbol: '✍️',
    examples: ['build a twist ending', 'create a setting for a thriller', 'develop a character arc for a short story'],
    call: { starters: ['Short and sweet. What\'s the plot?', 'Short story writer here. How can I help?', 'Let\'s write a memorable story.', 'Hello.'] },
  },
};
