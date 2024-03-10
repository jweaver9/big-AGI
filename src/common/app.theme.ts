import createCache from '@emotion/cache';

import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { extendTheme } from '@mui/joy';
import { keyframes } from '@emotion/react';


// CSS utils
export const hideOnMobile = { display: { xs: 'none', md: 'flex' } };
// export const hideOnDesktop = { display: { xs: 'flex', md: 'none' } };

// Dimensions
export const formLabelStartWidth = 140;


// Theme & Fonts

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: [ /* '300', sm */ '500' /* (undefined, default) */, '600' /* md */, '700' /* lg */, '800' /* xl */],
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

export const appTheme = extendTheme({
  fontFamily: {
    body: plusJakartaSans.style.fontFamily,
    code: jetBrainsMono.style.fontFamily,
  },
  colorSchemes: {
    light: {
      palette: {
        neutral: {
        plainColor: 'var(--joy-palette-neutral-800)', // Darker for dropdown menu text to increase contrast
        solidBg: 'var(--joy-palette-neutral-700)', // Darker for PageBar background & Button[solid] for visibility
        solidHoverBg: 'var(--joy-palette-neutral-800)', // Even darker for Buttons[solid]:hover to indicate interaction
        },
        // primary [800] > secondary [700 -> 800] > tertiary [600] > icon [500 -> 700]
        text: {
          secondary: 'var(--joy-palette-chartreuse, #99AC51)', // Directly using the vibrant chartreuse for secondary text
          tertiary: 'var(--joy-palette-neutral-700)', // Darker for better readability as tertiary text
          icon: 'var(--joy-palette-neutral-700)', // Same as tertiary for consistency in icons and similar elements
        },
        // popup [white] > surface [50] > level1 [100] > level2 [200] > level3 [300 -> unused] > body [white -> 300]
        background: {
          // New
          surface: 'var(--joy-palette-neutral-50, #E8EBEF)', // Lightest for surface areas
        level1: 'var(--joy-palette-neutral-100, #D6DDE4)', // Slightly darker for level 1 background
        level2: 'var(--joy-palette-neutral-200, #BCC8D4)', // Further depth for level 2 background
        body: 'var(--joy-palette-neutral-300, #A3B4C6)', // Darkest in the light palette for body background, provides contrast without being too stark
          // Former
          // body: 'var(--joy-palette-neutral-400, #9FA6AD)',
        },
      },
    },
    dark: {
      palette: {
        text: {
          // do not increase contrast - text.primary would scream at you
          secondary: 'var(--joy-palette-neutral-100, #99AC51)',
          tertiary: 'var(--joy-palette-neutral-400, #6E675F)',
        },
        background: {
          // New
          popup: '#434337', // 3: #32383E, 1: #171A1C, 2: #25282B
          surface: 'var(--joy-palette-neutral-900, #171A1C)',
          level1: 'var(--joy-palette-neutral-800, #434337)',
          level2: 'var(--joy-palette-neutral-700, #171A1C)',
          body: '#171A1C',
          // Former: popup > surface [900] > level 1 [black], level 2 [800] > body [black]
        },
      },
    },
  },
  components: {

    JoyInput: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },

  
    JoySelect: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },

    // JoyModal: 
    //   styleOverrides: {
    //     backdrop: {
    //       // backdropFilter: 'blur(2px)',
    //       backdropFilter: 'none',
    //     },
    //   },
    // },

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


// Dyanmic UI Sizing
export type ContentScaling = 'xs' | 'sm' | 'md';

export function adjustContentScaling(scaling: ContentScaling, offset?: number) {
  if (!offset) return scaling;
  const scalingArray = ['xs', 'sm', 'md'];
  const scalingIndex = scalingArray.indexOf(scaling);
  const newScalingIndex = Math.max(0, Math.min(scalingArray.length - 1, scalingIndex + offset));
  return scalingArray[newScalingIndex] as ContentScaling;
}

interface ContentScalingOptions {
  // BlocksRenderer
  blockCodeFontSize: string;
  blockFontSize: string;
  blockImageGap: number;
  blockLineHeight: string | number;
  // ChatMessage
  chatMessagePadding: number;
  // ChatDrawer
  chatDrawerItemSx: { '--ListItem-minHeight': string, fontSize: string };
  chatDrawerItemFolderSx: { '--ListItem-minHeight': string, fontSize: string };
}

export const themeScalingMap: Record<ContentScaling, ContentScalingOptions> = {
  xs: {
    blockCodeFontSize: '0.875rem', // Starting smaller for xs
    blockFontSize: 'xs',
    blockImageGap: 2,
    blockLineHeight: 1.4,
    chatMessagePadding: 4,
    chatDrawerItemSx: { '--ListItem-minHeight': '2rem', fontSize: '0.75rem' }, // Adjusted for coherence
    chatDrawerItemFolderSx: { '--ListItem-minHeight': '2.25rem', fontSize: '0.75rem' },
  },
  sm: {
    blockCodeFontSize: '1rem', // Standard size for sm
    blockFontSize: 'sm',
    blockImageGap: 2.5,
    blockLineHeight: 1.6,
    chatMessagePadding: 5,
    chatDrawerItemSx: { '--ListItem-minHeight': '2.5rem', fontSize: '0.875rem' },
    chatDrawerItemFolderSx: { '--ListItem-minHeight': '2.75rem', fontSize: '0.875rem' },
  },
  md: {
    blockCodeFontSize: '1.125rem', // Slightly larger for md
    blockFontSize: 'md',
    blockImageGap: 3,
    blockLineHeight: 1.75,
    chatMessagePadding: 6,
    chatDrawerItemSx: { '--ListItem-minHeight': '3rem', fontSize: '1rem' },
    chatDrawerItemFolderSx: { '--ListItem-minHeight': '3.25rem', fontSize: '1rem' },
  },
};

  // lg: {
  //   chatDrawerFoldersLineHeight: '3rem',
  // },
// };

export const cssRainbowColorKeyframes = keyframes`
    100%, 0% {
        color: rgb(255, 0, 0);
    }
    8% {
        color: rgb(204, 102, 0);
    }
    16% {
        color: rgb(128, 128, 0);
    }
    25% {
        color: rgb(77, 153, 0);
    }
    33% {
        color: rgb(0, 179, 0);
    }
    41% {
        color: rgb(0, 153, 82);
    }
    50% {
        color: rgb(0, 128, 128);
    }
    58% {
        color: rgb(0, 102, 204);
    }
    66% {
        color: rgb(0, 0, 255);
    }
    75% {
        color: rgb(127, 0, 255);
    }
    83% {
        color: rgb(153, 0, 153);
    }
    91% {
        color: rgb(204, 0, 102);
    }`;


// Emotion Cache (with insertion point on the SSR pass)

const isBrowser = typeof document !== 'undefined';

export function createEmotionCache() {
  let insertionPoint;

  if (isBrowser) {
    // On the client side, _document.tsx has a meta tag with the name "emotion-insertion-point" at the top of the <head>.
    // This assures that MUI styles are loaded first, and allows allows developers to easily override MUI styles with other solutions like CSS modules.
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]',
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: 'mui-style', insertionPoint });
}

// MISC

// For next April Fools' week
// export const foolsMode = new Date().getMonth() === 3 && new Date().getDate() <= 7;
