import { Config } from 'tailwindcss'

import { theme } from './src/config/theme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{tsx,ts}'],
  theme: {
    backgroundColor: {
      background: theme.background,
      primary: theme.primary,
      disabled: theme.disabled,
      error: theme.error,
      dark: theme.dark,
    },
    colors: {
      onBackground: theme.onBackground,
      secondary: theme.secondary,
      dark: theme.dark,
      error: theme.error,
    },
    extend: {
      height: {
        button: '32px',
        input: '40px',
      },
      width: {
        button: '110px',
      },
      minWidth: {
        modal: '500px',
      },
    },
  },
  plugins: [],
} satisfies Config
