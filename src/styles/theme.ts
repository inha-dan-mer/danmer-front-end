const colors = {
  primary: '#2ff4d6',
  background: '#272727',
};
const size = {
  header: '60px',
};
const theme = { colors, size };

export type ColorType = Record<keyof typeof colors, string>;
export type SizeType = Record<keyof typeof size, string>;
export default theme;
