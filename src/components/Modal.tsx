import styled from '@emotion/styled';
import React, { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from './buttons/Button';

const rootElement = document.getElementById('root')?.parentElement;
if (!rootElement) throw new Error('Failed to find the root element');

export interface ModalProps {
  children: React.ReactNode;
  visible: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onOk?: () => void;
  okText?: string;
  cancleText?: string;
  okButtonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;
  cancelButtonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;
  title?: string;
  footer?: React.ReactNode[];
  cancleButton?: boolean;
  okButton?: boolean;
}

const Modal = ({
  visible: isOpen,
  title,
  children,
  footer,
  onOpen,
  onClose,
  onOk,
  okText = '확인',
  cancleText = '취소',
  okButtonProps,
  cancelButtonProps,
  cancleButton = true,
  okButton = true,
}: ModalProps) => {
  const [visible, setVisible] = useState(false);

  const closeModal = () => setVisible(false);

  useEffect(() => {
    isOpen ? onOpen?.() : onClose?.();
    setVisible(isOpen);
  }, [isOpen]);

  return createPortal(
    <>
      <Background visible={visible} onClick={closeModal} />
      <ModalContainer visible={visible}>
        {title && (
          <Header>
            {title}
            <CloseIcon onClick={closeModal} />
          </Header>
        )}
        {children && <Content>{children}</Content>}
        {footer || (
          <Footer>
            {cancleButton && (
              <Button onClick={closeModal} {...cancelButtonProps}>
                {cancleText}
              </Button>
            )}
            {okButton && (
              <Button onClick={() => onOk?.()} {...okButtonProps}>
                {okText}
              </Button>
            )}
          </Footer>
        )}
      </ModalContainer>
    </>,
    rootElement
  );
};

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

const ModalContainer = styled.article<{ visible: boolean }>`
  position: absolute;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 400px;
  background-color: white;
  border-radius: 8px;
  z-index: 10001;
`;
const Header = styled.header`
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const Content = styled.section`
  padding: 20px;
`;
const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 10px 20px;
  border-top: 1px solid lightgray;
`;

const CloseIcon = styled.span`
  position: absolute;
  right: 15px;
  top: 15px;
  width: 24px;
  height: 24px;
  opacity: 0.3;
  transition: all 0.2s;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  &:before,
  &:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 20px;
    width: 2px;
    background-color: #333;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

export default Modal;
