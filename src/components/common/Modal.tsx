import { useRef } from 'react';
import { createPortal } from 'react-dom';

import styled from 'styled-components';

import CloseModalIcon from '@assets/svg_closeModalIcon.svg';
import useClickAway from '@hooks/useClickAway';

interface ModalProps {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ visible, title, children, onClose }: ModalProps) => {
  const ref = useRef(null);
  useClickAway(ref, () => onClose && onClose());
  const portalDiv = document.querySelector('#modal-root');

  if (!portalDiv) {
    return null;
  }
  return (
    <>
      {visible &&
        createPortal(
          <ModalBackgroundLayout visible={visible}>
            <ModalBox ref={ref}>
              <ModalHeader>
                {title}
                <ModalCloseButton onClick={() => onClose && onClose()}>
                  <img src={CloseModalIcon} />
                </ModalCloseButton>
              </ModalHeader>
              {children}
            </ModalBox>
          </ModalBackgroundLayout>,
          portalDiv,
        )}
    </>
  );
};

// TODO: 임시 스타일링으로 추후 변경되어야 한다.
const ModalBackgroundLayout = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(${(props) => props.theme.layout.scale});
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  min-height: 100vh;
  padding-right: 15vw;
  padding-left: 15vw;
`;

const ModalBox = styled.div`
  background-color: white;
  box-shadow: ${(props) => props.theme.boxShadows.boxShadow};
  width: 560px;
  height: fit-content;
  position: relative;
  z-index: 20;
  margin: auto;
`;

const ModalHeader = styled.div`
  position: relative;
  font-size: 24px;
  color: ${(props) => props.theme.colors.ivory1};
  height: 48px;
  background-color: ${(props) => props.theme.colors.darkGrey1};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalCloseButton = styled.button`
  cursor: pointer;
  position: absolute;
  font-size: inherit;
  color: inherit;
  background-color: transparent;
  right: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Modal;
