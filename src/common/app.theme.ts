// app.theme.ts
import createCache from '@emotion/cache';
import { keyframes } from '@emotion/react';
import { extendTheme } from '@mui/joy';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';

// Google fonts setup
const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const jetBrainsMono = JetBrains_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['monospace'],
});


// Extending the default theme with custom settings
export const appTheme = extendTheme({
  fontFamily: {
    body: plusJakartaSans.style.fontFamily,
    code: jetBrainsMono.style.fontFamily,
  },
  colorSchemes: {
    light: {
      palette: {
        neutral: {
          plainColor: 'var(--joy-palette-neutral-800)',
          solidBg: 'var(--joy-palette-neutral-700)',
          solidHoverBg: 'var(--joy-palette-neutral-800)',
        },
        text: {
          secondary: 'var(--joy-palette-chartreuse, #99AC51)',
          tertiary: 'var(--joy-palette-neutral-700)',
          icon: 'var(--joy-palette-neutral-700)',
        },
        background: {
          surface: 'var(--joy-palette-neutral-50, #E8EBEF)',
          level1: 'var(--joy-palette-neutral-100, #D6DDE4)',
          level2: 'var(--joy-palette-neutral-200, #BCC8D4)',
          body: 'var(--joy-palette-neutral-300, #A3B4C6)',
        },
      },
    },
    dark: {
      palette: {
        text: {
          secondary: 'var(--joy-palette-neutral-100, #99AC51)',
          tertiary: 'var(--joy-palette-neutral-400, #6E675F)',
        },
        background: {
          popup: '#434337',
          surface: 'var(--joy-palette-neutral-900, #171A1C)',
          level1: 'var(--joy-palette-neutral-800, #434337)',
          level2: 'var(--joy-palette-neutral-700, #171A1C)',
          body: '#171A1C',
        },
      },
    },
  },
  components: {
    JoyInput: {
      styleOverrides: {
        root: { boxShadow: 'none' },
      },
    },
    JoySelect: {
      styleOverrides: {
        root: { boxShadow: 'none' },
      },
    },
    JoySwitch: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.size === 'md' && {
            '--Switch-trackWidth': '10px',
            '--Switch-trackHeight': '5px',
            '--Switch-thumbSize': '3px',
          }),
        }),
      },
    },
  },
});

// Dynamic UI Sizing Types and Implementation
export type ContentScaling = 'xs' | 'sm' | 'md';

interface ContentScalingOptions {
  blockCodeFontSize: string;
  blockFontSize: string;
  blockImageGap: number;
  blockLineHeight: number;
  messagePadding:  number;
  chatDrawerItemSx: { '--ListItem-minHeight': string, fontSize: string };
  chatDrawerItemFolderSx: { '--ListItem-minHeight': string, fontSize: string };
}

export const themeScalingMap: Record <ContentScaling, ContentScalingOptions> = {
  xs: {
    blockCodeFontSize: '0.875rem', // Starting smaller for xs
    blockFontSize: 'xs',
    blockImageGap: 2,
    blockLineHeight: 1.4,
    messagePadding: 2,
    chatDrawerItemSx: { '--ListItem-minHeight': '2rem', fontSize: '0.75rem' }, // Adjusted for coherence
    chatDrawerItemFolderSx: { '--ListItem-minHeight': '2.25rem', fontSize: '0.75rem' },
  },
  sm: {
    blockCodeFontSize: '1rem', // Standard size for sm
    blockFontSize: 'sm',
    blockImageGap: 2.5,
    blockLineHeight: 1.6,
    messagePadding: 5,
    chatDrawerItemSx: { '--ListItem-minHeight': '2.5rem', fontSize: '0.875rem' },
    chatDrawerItemFolderSx: { '--ListItem-minHeight': '2.75rem', fontSize: '0.875rem' },
  },
  md: {
    blockCodeFontSize: '1.125rem', // Slightly larger for md
    blockFontSize: 'md',
    blockImageGap: 3,
    blockLineHeight: 1.75,
    messagePadding: 6,
    chatDrawerItemSx: { '--ListItem-minHeight': '3rem', fontSize: '1rem' },
    chatDrawerItemFolderSx: { '--ListItem-minHeight': '3.25rem', fontSize: '1rem' },
  },
};

export const themeBgApp = 'background.level1';
export const themeBgAppDarker = 'background.level2';
export const themeBgAppChatComposer = 'background.surface';
export const lineHeightChatTextMd = 1.15;
export const lineHeightTextareaMd = 1.15;
export const themeZIndexPageBar = 0;
export const themeZIndexDesktopDrawer = 25;
export const themeZIndexDesktopNav = 15;
export const themeZIndexOverMobileDrawer = 1301;
export const themeBreakpoints = appTheme.breakpoints.values;

// Keyframes for dynamic CSS animations
export const cssRainbowColorKeyframes = keyframes`
    100%, 0% {
        color: rgb(255, 0, 0);
    }
    8% {
        color: rgb(204, 102, 0);
    }
    // Add all your keyframe color changes here
`;

// Function to create an Emotion cache instance
export function createEmotionCache() {
  const emotionInsertionPoint = typeof document !== 'undefined' ? document.querySelector('meta[name="emotion-insertion-point"]') : null;

  const cacheConfig = {
    key: 'mui-style',
    ...(emotionInsertionPoint instanceof HTMLElement ? { insertionPoint: emotionInsertionPoint } : {}),
  };

  return createCache(cacheConfig);
}
