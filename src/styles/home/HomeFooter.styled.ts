import theme from '@/styles/theme';
import styled from 'styled-components';

export const StyledHomeFooter = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 18px;
  width: 86.8%;
  margin: 8% 6.6% 0px 6.6%;
`;

export const ScrollContainer = styled.div`
  display: flex;
  width: 94%;
  margin: 4% 3% 0px 3%;
  overflow-x: auto;
  cursor: grab;
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
  }
`;

export const ImgContainer = styled.div`
  margin-bottom: 5px;
`;

export const GridItem = styled.a`
  flex: 0 0 auto;
  margin-right: 10px;
  padding: 10px 15px 15px 0;
  background-color: ${theme.color.gray[18]};
  font-family: ${theme.font.semiBold};
  width: 34%;
  height: 77px;
  color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  font-size: 16px;
  white-space: nowrap;
  text-decoration: none;

  &:last-child {
    margin-right: 0;
  }
`;

export const GridItemWithImage = styled(GridItem)<{ $image: string }>`
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  border: none;
  text-align: center;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  position: relative;
  overflow: hidden;
  padding: 10px;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.9)
    );
    z-index: 1;
  }

  span {
    position: relative;
    z-index: 2;
    color: #fff;
    font-size: 16px;
  }
`;
