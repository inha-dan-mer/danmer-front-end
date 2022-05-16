import '@emotion/react';
import { ColorType, SizeType } from './theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: ColorType;
    size: SizeType;
  }
}
