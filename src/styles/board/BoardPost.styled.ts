import theme from '@/styles/theme';
import styled from 'styled-components';

export const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 370px;
  padding-bottom: 20px;
  ul {
    margin: 0;
  }
`;

export const FileUploaderWrapper = styled.div`
  // display: flex;
  // flex-direction: row;
  margin-left: 20px;
  align-items: flex-start;
  top: calc(var(--vh, 1vh) * 40 + 120px);
`;

export const TitleInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  margin: 0 20px;
  padding: 20px 0;
  color: white;
  font-size: 16px;
  font-family: ${theme.font.semiBold};
  &::placeholder {
    font-size: 16px;
    font-family: ${theme.font.semiBold};
  }
`;

export const ContentInput = styled.textarea`
  height: calc(var(--vh, 1vh) * 40);
  background-color: transparent;
  border: none;
  outline: none;
  resize: none;
  margin: 0 20px;
  padding-top: 20px;
  color: white;
  font-size: 16px;
  font-family: ${theme.font.regular};

  &::placeholder {
    font-size: 16px;
    font-family: ${theme.font.regular};
  }
`;

export const DeleteButton = styled.img`
  margin-left: 10px;
  cursor: pointer;
`;

export const NoticeTextContainer = styled.div`
  margin: 10px 25px 0 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const NoticeTitleText = styled.div`
  font-size: 16px;
  font-family: ${theme.font.semiBold};
  line-height: 19.2px;
`;

export const AllText = styled.div`
  font-size: 10px;
  color: ${theme.color.gray[65]};
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
