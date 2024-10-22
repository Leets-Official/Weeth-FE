import styled from 'styled-components';
import theme from '@/styles/theme';

export const StyledReceipt = styled.div`
  width: 370px;
  height: calc(var(--vh, 1vh) * 100);
  font-family: ${theme.font.family.pretendard_regular};
`;

export const Line = styled.div`
  border: 1px solid;
  color: #4d4d4d;
  width: 88%;
  margin: 15px 6% 0 6%;
  transform: scaleY(0.2);
`;

export const StyledMonth = styled.div`
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 18px;
  margin: 15px 0 0 6%;
`;

export const ScrollContainer = styled.div`
  display: flex;
  width: 88%;
  margin: 15px 6% 0 6%;
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
  }
`;

export const GridItem = styled.div`
  flex: 0 0 auto;
  margin-right: 10px;
  padding: 0;
  background-color: ${theme.color.grayScale.gray18};
  width: 56%;
  height: 124px;
  color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
  position: relative;
  &:last-child {
    margin-right: 0;
  }
`;

export const OpenModalButton = styled.button`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  border: none;
`;

export const GridItemImage = styled.embed`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  scroll: no;
  overflow: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ModalImage = styled.embed`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
