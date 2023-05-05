import { createStitches } from '@stitches/react';

export const { styled, getCssText, createTheme, globalCss } = createStitches({
  theme: {
    colors: {
      white: '#fff',
      black: '#000',
      primary: '',
      secondary: '',
      tertiary: '',
      background: '',
      text: '',
    },
    fontSizes: {
      xxs: '0.625rem',
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '4xl': '2rem',
      '5xl': '2.25rem',
      '6xl': '3rem',
      '7xl': '4rem',
      '8xl': '4.5rem',
      '9xl': '6rem',
    },
    space: {
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      40: '10rem',
      64: '16rem',
      80: '20rem',
    },
    radii: {
      px: '1px',
      xs: '4px',
      sm: '6px',
      md: '8px',
      lg: '16px',
      full: '99999px',
    },
  },
});

export const lightTheme = createTheme('light', {
  colors: {
    primary: '#8a00d4',
    secondary: '#d527b7',
    tertiary: '#f782c2',
    background: '#e3e3e3',
    text: '#424242',
  },
});

export const darkTheme = createTheme('dark', {
  colors: {
    primary: '#3c2a4d',
    secondary: '#574f7d',
    tertiary: '#95adbe',
    background: '#333333',
    text: '#e0f0ea',
  },
});
