const colors = {
  primary: '#2ff4d6',
  background: '#383838',
};
const theme = { colors };

export type ColorType = Record<keyof typeof colors, string>;
export default theme;
