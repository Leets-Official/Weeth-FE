import theme from '@/styles/theme';
import styled from 'styled-components';

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

export const Line = styled.div`
  border: 1px solid #4d4d4d;
  margin-top: 30px;
  transform: scaleY(0.2);
`;

export const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

// PenaltyBox Component
export const PenaltyDetail = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

export const PenaltyIcon = styled.div`
  width: 28px;
  height: 43px;
  background-color: ${theme.color.negative};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-right: 10px;
`;

export const PenaltyTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 16px;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 25px;
  font-size: 16px;
  aling-items: center;
`;

export const PenaltyCount = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 32px;
  margin-top: 19px;
`;
