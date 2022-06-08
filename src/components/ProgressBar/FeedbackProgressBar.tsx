import { useMemo } from 'react';
import styled from '@emotion/styled';

import { FEEDBACK_DURATION } from '@/utils/constants';

interface Props {
  feedback: number[];
  position: number;
  videoDuration?: number;
  onPieceClick: (order: number) => void;
}

const FeedbackProgressBar = ({ position, feedback, videoDuration, onPieceClick }: Props) => {
  const baseWidth = useMemo(
    () => (videoDuration ? FEEDBACK_DURATION / videoDuration : 0),
    [videoDuration]
  );

  return (
    <Container>
      {feedback.map((fb, idx) => (
        <FeedbackPiece
          position={baseWidth * idx}
          width={baseWidth}
          level={fb}
          onClick={() => onPieceClick(idx)}
        />
      ))}
      <ProgressBar position={position} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 8px;
  width: 100%;
  background-color: tomato;

  border-radius: 100px;
  overflow: hidden;
`;
const ProgressBar = styled.div<{ position: number }>`
  position: absolute;
  top: 0;
  left: ${({ position }) => position * 100}%;
  height: inherit;
  width: 3px;
  background-color: ${({ theme }) => theme.colors.background};
`;
const FeedbackPiece = styled.div<{ position: number; width: number; level: number }>`
  position: absolute;
  top: 0;
  left: ${({ position }) => position * 100}%;
  height: inherit;
  width: ${({ width }) => width * 100}%;
  transition: 0.1s all ease;
  background-color: ${({ level, theme }) => {
    switch (level) {
      case 0:
        return theme.colors.level0;
      case 1:
        return theme.colors.level1;
      case 2:
        return theme.colors.level2;
      case 3:
        return theme.colors.level3;
      case 4:
        return theme.colors.level4;
    }
  }};

  &:hover {
    cursor: pointer;
    filter: brightness(0.7);
  }
`;

export default FeedbackProgressBar;
