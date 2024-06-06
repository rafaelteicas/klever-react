const colors = {
  white: '#FFFFFF',
  black: '#0e0e0e',
  purple: '#AA33B5',
  darkBlue: '#13162B',
  yellow: '#CFDC43',
  gray: '#646464',
  red: '#920000',
}

export const theme = {
  background: colors.darkBlue,
  onBackground: colors.white,
  primary: colors.purple,
  secondary: colors.yellow,
  disabled: colors.gray,
  error: colors.red,
  dark: colors.black,
  ...colors,
}
