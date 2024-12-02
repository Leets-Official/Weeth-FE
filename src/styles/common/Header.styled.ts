import styled from 'styled-components';
import theme from '../theme';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 25px 20px 25px;
`;

export const Title = styled.div`
  font-size: 18px;
  font-family: ${theme.font.semiBold};
`;

export const None = styled.div`
  width: 24px;
`;

export const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const Year = styled.div`
  font-size: 18px;
  font-family: ${theme.font.semiBold};
  padding-right: 5px;
`;

export const Month = styled.div`
  font-size: 18px;
  font-family: ${theme.font.semiBold};
`;

export const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 5px;
  cursor: pointer;
`;
