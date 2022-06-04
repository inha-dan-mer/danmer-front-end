import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

const rootElement = document.getElementById('root')?.parentElement;
if (!rootElement) throw new Error('Failed to find the root element');

interface Props {
  onFinish: () => void;
  countNum?: number;
}

export type StartcountRef = {
  start: () => void;
};

const StartCount = forwardRef<StartcountRef, Props>(({ onFinish, countNum = 3 }, ref) => {
  const intervalId = useRef<NodeJS.Timer>();
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(countNum);

  const startCount = () => {
    setVisible(true);
    intervalId.current = setInterval(() => {
      setCount((cnt) => cnt - 1);
    }, 1000);
  };

  const onCountFinish = () => {
    clearInterval(intervalId.current);
    setVisible(false);
    setCount(countNum);
    onFinish();
  };

  useEffect(() => {
    if (count > 0) return;
    onCountFinish();
  }, [count]);

  useImperativeHandle(ref, () => ({
    start: startCount,
  }));

  return createPortal(
    <>
      <Background visible={visible} />
      <ModalContainer visible={visible}>
        <h1>{count}</h1>
      </ModalContainer>
    </>,
    rootElement
  );
});

const Background = styled.div<{ visible: boolean }>`
  position: absolute;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  animation: fadein 0.3s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContainer = styled.div<{ visible: boolean }>`
  position: absolute;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);

  font-size: 7rem;
  font-weight: bolder;
  color: white;
  z-index: 10001;
`;

export default StartCount;
