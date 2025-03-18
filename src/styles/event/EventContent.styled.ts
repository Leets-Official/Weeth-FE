import theme from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const ModalSetting = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 9px;

  position: fixed;
  top: 10px;
  right: 15px;
`;

export const ImgButton = styled.img`
  cursor: pointer;
`;

export const Date = styled.div`
  font-size: 48px;
  font-family: ${theme.font.semiBold};
`;

export const Title = styled.div<{ isFullScreen: boolean }>`
  padding-top: 15px;
  font-family: ${theme.font.semiBold};

  ${(props) =>
    props.isFullScreen
      ? `
        font-size: 100px;
        color: ${theme.color.gray[65]};
      `
      : ``}
`;

export const AttendanceCode = styled.div<{ isFullScreen: boolean }>`
  padding-bottom: 20px;
  color: ${theme.color.main};
  font-size: 48px;
  font-family: ${theme.font.semiBold};

  ${(props) =>
    props.isFullScreen
      ? `
        font-size: 300px;
      `
      : ``}
`;

export const ContentBlock = styled.div`
  width: 88%;
  background-color: ${theme.color.gray[18]};
  padding: 15px;
  border-radius: 10px;
  white-space: pre-wrap;

  a {
    color: ${theme.color.main};
    text-decoration: none;
  }

  a:hover {
    color: ${theme.color.mainDark};
  }
`;

export const Time = styled.div`
  display: flex;
  flex-direction: row;
`;

export const EndTime = styled.div`
  padding-left: 25px;
`;
