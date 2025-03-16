import styled from 'styled-components';

export const OpenModal = styled.div`
  display: block;
`;
export const StyledModal = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: -15%;
  width: 100%;
  height: 115%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(2px);
  webkitbackdropfilter: 'blur(5px)';
`;
export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 19.688rem;
  min-width: 19.688rem;
  height: 30.563rem;
  max-height: 30.563rem;
  background-color: #2f2f2f;
  border-radius: 14px;
  padding: 15px;
  box-sizing: border-box;
  overflow-y: auto;
  scrollbar-width: none;

  // For Webkit browsers like Chrome and Safari
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.div`
  font-size: 16px;
  margin-top: 25px;
`;

export const ModalText = styled.div`
  font-size: 14px;
  color: #a6a6a6;
  margin-top: 20px;
`;

export const ModalDate = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  margin-top: 15px;
`;

export const ModalPlace = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  margin-top: 5px;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 0 0;
`;

export const ModalPenalty = styled.div`
  font-size: 32px;
  margin-top: 19px;
`;
