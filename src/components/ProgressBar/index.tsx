import React from 'react';

interface Props {
  value: number;
}

const ProgressBar = ({ value }: Props) => {
  return <progress max={100} value={value} style={{ width: '100%' }}></progress>;
};

export default ProgressBar;
