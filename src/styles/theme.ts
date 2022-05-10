const colors = {
  primary: '#2ff4d6',
  background: '#272727',
};
const theme = { colors };

export type ColorType = Record<keyof typeof colors, string>;
export default theme;
