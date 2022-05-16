import React, { HTMLProps } from 'react';

interface Props extends HTMLProps<HTMLProgressElement> {}

const ProgressBar = ({ style, ...restProps }: Props) => {
  return <progress style={{ width: '100%', ...style }} {...restProps}></progress>;
};

export default ProgressBar;
