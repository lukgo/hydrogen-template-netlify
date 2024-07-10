// Note Has to be a .js file to be used as a module

import plugin from 'tailwindcss/plugin';
import {fontFamily} from 'tailwindcss/defaultTheme';
import {themeStyles} from './app/themeStyles';
import dotenv from 'dotenv';

dotenv.config();

const brand = process.env.VITE_BRAND;

const CAROUSEL_ITEM_GAP = '1.5rem';
/**
 *
 * @param {*} itemsVisible number of items visible at a time in a carousel
 * @returns calculated flex basis that takes into account the gaps between the items
 */
const carouselItemBasis = (itemsVisible) =>
  `basis-[calc((100%-${CAROUSEL_ITEM_GAP}*${Math.ceil(
    itemsVisible - 1,
  )})/${itemsVisible})]`;

export const shadcnPlugin = plugin(
  function ({addBase, addUtilities}) {
    addUtilities({
      /* Hide scrollbar for Chrome, Safari and Opera */
      '.no-scrollbar::-webkit-scrollbar': {
        display: 'none',
      },

      // /* Hide scrollbar for IE, Edge and Firefox */
      '.no-scrollbar': {
        '-ms-overflow-style': 'none' /* IE and Edge */,
        'scrollbar-width': 'none' /* Firefox */,
      },
      '.default-list-styles': {
        'list-style': 'revert',
        padding: 'revert',
        margin: 'revert',
      },
      // typography styles of headings to be applied on non-heading elements
      '.h4-style': {
        '@apply p-0 leading-[110%] text-[2rem]': {},
        'font-family': 'var(--h-family)',
      },
      '.h5-style': {
        '@apply text-2xl p-0 leading-normal': {},
        'font-family': 'var(--h5-family)',
      },
      '.p-xl-style': {
        '@apply text-xl': {},
        'font-family': 'var(--h-family)',
      },
      // carousel-specific styles to display number of items
      '.carousel-4': {
        [`@apply ${carouselItemBasis(4)}`]: {},
      },
      '.carousel-3\\.5': {
        [`@apply ${carouselItemBasis(3.5)}`]: {},
      },
      '.carousel-3': {
        [`@apply ${carouselItemBasis(3)}`]: {},
      },
      '.carousel-2\\.5': {
        [`@apply ${carouselItemBasis(2.5)}`]: {},
      },
      '.carousel-2': {
        [`@apply ${carouselItemBasis(2)}`]: {},
      },
      '.carousel-1\\.5': {
        [`@apply ${carouselItemBasis(1.5)}`]: {},
      },
      '.carousel-1': {
        [`@apply ${carouselItemBasis(1)}`]: {},
      },
      '.brand-logo': {
        height: 'var(--logo-height)',
        width: 'var(--logo-width)',
        'max-width': 'var(--logo-width)',
      },
      '.brand-logo-large': {
        height: 'var(--logo-height-lg)',
        width: 'var(--logo-width-lg)',
        'max-width': 'var(--logo-width-lg)',
      },
    });

    addBase({
      ':root': themeStyles?.[brand]?.theme,
    });

    addBase({
      '*': {
        '@apply border-border focus-visible:outline-none focus-visible:ring-4':
          {},
      },
      body: {
        '@apply bg-background text-foreground overflow-x-hidden': {},
      },
      h1: {
        '@apply p-0 leading-[110%] text-[3rem] lg:text-[4rem]': {},
        'font-family': 'var(--h-family)',
        'letter-spacing': '0.1em',
      },

      h2: {
        '@apply p-0 leading-[110%] text-[2.5rem] lg:text-5xl': {},
        'font-family': 'var(--h-family)',
        'letter-spacing': '0.05em',
      },
      h3: {
        '@apply p-0 leading-[110%] text-[2rem] lg:text-[2.5rem]': {},
        'font-family': 'var(--h-family)',
        'letter-spacing': '0.05em',
      },
      h4: {
        '@apply p-0 leading-[110%] text-[1.75rem] lg:text-[2rem]': {},
        'font-family': 'var(--h-family)',
        'letter-spacing': '0.05em',
      },
      h5: {
        '@apply text-2xl p-0 leading-normal': {},
        'font-family': 'var(--h5-family)',
      },
      h6: {
        '@apply text-[xl] p-0 leading-normal': {},
        'font-family': 'var(--h6-family)',
      },
      p: {
        '@apply p-0 text-xl': {},
      },
      li: {
        '@apply p-0 text-xl': {},
      },
    });
  },
  {
    theme: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
          xs: '420px',
        },
      },
      fontFamily: {
        'button-family': 'var(--button-family)',
      },
      extend: {
        colors: {
          border: 'hsl(var(--border) / <alpha-value>)',
          input: 'hsl(var(--input) / <alpha-value>)',
          ring: 'hsl(var(--ring) / <alpha-value>)',
          background: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
          default: {
            DEFAULT: 'hsl(var(--default) / <alpha-value>)',
            foreground: 'hsl(var(--default-foreground) / <alpha-value>)',
          },
          primary: {
            DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
            foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
          },
          secondary: {
            DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
            foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
          },
          'brand-color1': {
            DEFAULT: 'var(--brand-color1)',
            foreground: 'hsl(var(--brand-color1-foreground) / <alpha-value>)',
          },
          'brand-color2': {
            DEFAULT: 'hsl(var(--brand-color2) / <alpha-value>)',
            foreground: 'hsl(var(--brand-color2-foreground) / <alpha-value>)',
          },
          'brand-color3': {
            DEFAULT: 'hsl(var(--brand-color3) / <alpha-value>)',
            foreground: 'hsl(var(--brand-color3-foreground) / <alpha-value>)',
          },
          'brand-color4': {
            DEFAULT: 'hsl(var(--brand-color4) / <alpha-value>)',
            foreground: 'hsl(var(--brand-color4-foreground) / <alpha-value>)',
          },
          neutral: {
            DEFAULT: 'hsl(var(--neutral) / <alpha-value>)',
            foreground: 'hsl(var(--neutral-foreground) / <alpha-value>)',
          },
          navigation: {
            DEFAULT: 'hsl(var(--navigation) / <alpha-value>)',
            foreground: 'hsl(var(--navigation-foreground) / <alpha-value>)',
            inverted: 'hsl(var(--neutral) / <alpha-value>)',
            'sub-menu': 'hsl(var(--sub-menu) / <alpha-value>)',
            'sub-menu-foreground':
              'hsl(var(--sub-menu-foreground) / <alpha-value>)',
            border: 'hsl(var(--navigation-border) / <alpha-value>)',
          },
          'social-icon': {
            DEFAULT: 'hsl(var(--social-icon) / <alpha-value>)',
          },
          'button-primary': {
            DEFAULT:
              'hsl(var(--button-primary) / var(--button-primary-opacity))',
            foreground: 'hsl(var(--button-primary-foreground) / <alpha-value>)',
            outline: 'hsl(var(--button-primary-outline) / <alpha-value>)',
            hover:
              'hsl(var(--button-primary-hover) / var(--button-primary-opacity))',
            'foreground-hover':
              'hsl(var(--button-primary-foreground-hover) / <alpha-value>)',
            'outline-hover':
              'hsl(var(--button-primary-outline-hover) / <alpha-value>)',
          },
          'button-secondary': {
            DEFAULT:
              'hsl(var(--button-secondary) / var(--button-secondary-opacity))',
            foreground:
              'hsl(var(--button-secondary-foreground) / <alpha-value>)',
            outline: 'hsl(var(--button-secondary-outline) / <alpha-value>)',
            hover:
              'hsl(var(--button-secondary-hover) / var(--button-secondary-opacity-hover))',
            'foreground-hover':
              'hsl(var(--button-secondary-foreground-hover) / <alpha-value>)',
            'outline-hover':
              'hsl(var(--button-secondary-outline-hover) / <alpha-value>)',
          },
          'button-tertiary': {
            DEFAULT:
              'hsl(var(--button-tertiary) / var(--button-tertiary-opacity))',
            foreground: 'hsl(var(--tertiary-foreground) / <alpha-value>)',
            outline: 'hsl(var(--button-tertiary-outline) / <alpha-value>)',
            opacity: 'hsl(var(--button-tertiary-opacity) / <alpha-value>)',
            hover: 'hsl(var(--button-tertiary-hover) / <alpha-value>)',
            'foreground-hover':
              'hsl(var(--button-tertiary-foreground-hover) / <alpha-value>)',
            'outline-hover':
              'hsl(var(--button-tertiary-outline-hover) / <alpha-value>)',
            'opacity-hover':
              'hsl(var(--button-tertiary-opacity-hover) / <alpha-value>)',
          },
          'button-primary-alt': {
            DEFAULT:
              'hsl(var(--button-primary--alt) / var(--button-primary-opacity--alt))',
            foreground:
              'hsl(var(--button-primary-foreground--alt) / <alpha-value>)',
            outline: 'hsl(var(--button-primary-outline--alt) / <alpha-value>)',
            hover:
              'hsl(var(--button-primary-hover--alt) / var(--button-primary-opacity--alt))',
            'foreground-hover':
              'hsl(var(--button-primary-foreground-hover--alt) / <alpha-value>)',
            'outline-hover':
              'hsl(var(--button-primary-outline-hover--alt) / <alpha-value>)',
          },
          'button-secondary-alt': {
            DEFAULT:
              'hsl(var(--button-secondary--alt) / var(--button-secondary-opacity--alt))',
            foreground:
              'hsl(var(--button-secondary-foreground--alt) / <alpha-value>)',
            outline:
              'hsl(var(--button-secondary-outline--alt) / <alpha-value>)',
            hover:
              'hsl(var(--button-secondary-hover--alt) / var(--button-secondary-opacity-hover--alt))',
            'foreground-hover':
              'hsl(var(--button-secondary-foreground-hover--alt) / <alpha-value>)',
            'outline-hover':
              'hsl(var(--button-secondary-outline-hover--alt) / <alpha-value>)',
          },
          'button-tertiary-alt': {
            DEFAULT:
              'hsl(var(--button-tertiary--alt) / var(--button-tertiary-opacity--alt))',
            foreground:
              'hsl(var(--button-tertiary-foreground--alt) / <alpha-value>)',
            outline: 'hsl(var(--button-tertiary-outline--alt) / <alpha-value>)',
            opacity: 'hsl(var(--button-tertiary-opacity--alt) / <alpha-value>)',
            hover: 'hsl(var(--button-tertiary-hover--alt) / <alpha-value>)',
            'foreground-hover':
              'hsl(var(--button-tertiary-foreground-hover--alt) / <alpha-value>)',
            'outline-hover':
              'hsl(var(--button-tertiary-outline-hover--alt) / <alpha-value>)',
            'opacity-hover':
              'hsl(var(--button-tertiary-opacity-hover--alt) / <alpha-value>)',
          },
          destructive: {
            DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
            foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
          },
          muted: {
            DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
            foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
          },
          accent: {
            DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
            foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
          },
          popover: {
            DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
            foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
          },
          card: {
            DEFAULT: 'hsl(var(--card) / <alpha-value>)',
            foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
          },
        },
        backgroundImage: {
          'brand-color1': 'var(--brand-color1)',
        },
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)',
        },
        fontFamily: {
          sans: ['var(--family)', ...fontFamily.sans],
          // nunito: ['nunito', 'sans-serif'],
        },
        animation: {
          marquee: 'marquee 30s linear infinite',
        },
        keyframes: {
          marquee: {
            '0%': {
              transform: 'translate(0, 0)',
            },
            '100%': {
              transform: 'translate(-50%, 0)',
            },
          },
        },
        transitionTimingFunction: {
          'burger-transition': 'cubic-bezier(0.36, 1.8, 0.66, 1.2)',
        },
      },
    },
  },
);
