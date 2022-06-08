import styled from '@emotion/styled';

const FeedbackColorInfo = () => {
  return (
    <Wrapper>
      <Level level={0} text={'최고예요!'} />
      <Level level={1} text={'잘 하고 있어요'} />
      <Level level={2} text={'조금만 더 노력해봐요'} />
      <Level level={3} text={'연습을 많이 해야 해요'} />
      <Level level={4} text={'연습을 한 건가요?'} />
    </Wrapper>
  );
};

const Level = ({ text, level }: { text: string; level: 0 | 1 | 2 | 3 | 4 }) => (
  <LevelContainer>
    <Circle level={level} />
    <span>{text}</span>
  </LevelContainer>
);

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
`;
const LevelContainer = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  font-size: 0.9rem;
`;
const Circle = styled.div<{ level: 0 | 1 | 2 | 3 | 4 }>`
  width: 10px;
  height: 10px;
  border-radius: 100px;
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
`;

export default FeedbackColorInfo;
