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
          plainColor: 'var(--joy-palette-neutral-700)',     // [700 -> 800] Dropdown menu: increase text contrast a bit
          solidBg: 'var(--joy-palette-neutral-500)',        // [500 -> 700] PageBar background & Button[solid]
          solidHoverBg: 'var(--joy-palette-neutral-600)',   // [600 -> 800] Buttons[solid]:hover
        },
        // primary [800] > secondary [700 -> 800] > tertiary [600] > icon [500 -> 700]
        text: {
          icon: 'var(--joy-palette-neutral-700)',           // <IconButton color='neutral' />
          secondary: 'var(--joy-palette-neutral-600)',      // increase contrast a bit
          tertiary: 'var(--joy-palette-neutral-500)',       // increase contrast a bit
        },
        // popup [white] > surface [50] > level1 [100] > level2 [200] > level3 [300 -> unused] > body [white -> 300]
        background: {
          // New
          surface: 'var(--joy-palette-neutral-50, #E8EBEF)',
          level1: 'var(--joy-palette-neutral-100, #D6DDE4)',
          level2: 'var(--joy-palette-neutral-200, #BCC8D4)',
          body: 'var(--joy-palette-neutral-300, #A3B4C6)',
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

export const themeZIndexPageBar = 15;
export const themeZIndexDesktopDrawer = 17;
export const themeZIndexDesktopNav = 22;
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
    blockCodeFontSize: '0.55rem',
    blockFontSize: 'xs',
    blockImageGap: 1,
    blockLineHeight: 1.2,
    chatMessagePadding: 1,
    chatDrawerItemSx: { '--ListItem-minHeight': '1rem', fontSize: '13px' },          // 36px
    chatDrawerItemFolderSx: { '--ListItem-minHeight': '2em', fontSize: '16px' },     // 40px
  },
  sm: {
    blockCodeFontSize: '0.45rem',
    blockFontSize: 'sm',
    blockImageGap: 1.5,
    blockLineHeight: 1.714286,
    chatMessagePadding: 1.5,
    chatDrawerItemSx: { '--ListItem-minHeight': '1.5rem', fontSize: '20px' },
    chatDrawerItemFolderSx: { '--ListItem-minHeight': '2.5rem', fontSize: '24px' },
  },
  md: {
    blockCodeFontSize: '0.65rem',
    blockFontSize: 'md',
    blockImageGap: 2,
    blockLineHeight: 1.75,
    chatMessagePadding: 2,
    chatDrawerItemSx: { '--ListItem-minHeight': '2.5rem', fontSize: '24px' },           // 40px
    chatDrawerItemFolderSx: { '--ListItem-minHeight': '2.75rem', fontSize: '30px' },    // 44px
  },
  // lg: {
  //   chatDrawerFoldersLineHeight: '3rem',
  // },
};


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
