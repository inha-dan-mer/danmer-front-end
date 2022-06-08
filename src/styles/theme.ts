const colors = {
  primary: '#2ff4d6',
  background: '#272727',
  inputBackground: '#4e4e4e',
  inputOutline: '#e7e7e7',
  level0: '#53afff',
  level1: '#9de16f',
  level2: '#ffe272',
  level3: '#ff9351',
  level4: '#ff3737',
};
const size = {
  header: '60px',
};
const theme = { colors, size };

export type ColorType = Record<keyof typeof colors, string>;
export type SizeType = Record<keyof typeof size, string>;
export default theme;
