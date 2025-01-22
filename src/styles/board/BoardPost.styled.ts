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
  margin: 10px 25px 10px 15px;
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: space-between;
`;
export const NoticeTitleText = styled.div`
  font-size: 16px;
  font-family: ${theme.font.semiBold};
  line-height: 19.2px;
`;

export const AllText = styled.div`
  font-size: 12px;
  font-family: ${theme.font.regular};
  color: ${theme.color.gray[65]};
  cursor: pointer;
`;

export const ScrollContainer = styled.div`
  display: flex;
  width: calc(100% - 60px);
  padding: 0 20px;
  overflow-x: auto;
  gap: 10px;
  cursor: grab;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: ${theme.color.gray[65]};
  }
`;

export const NoticeCard = styled.div`
  flex: 0 0 auto;
  background-color: ${theme.color.mainMiddle};
  color: white;
  font-family: ${theme.font.semiBold};
  border-radius: 10px;
  width: 212px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  font-size: 14px;
  line-height: 1.4;

  &:nth-child(2) {
    background-color: ${theme.color.gray[30]};
    color: white;
  }
`;
export const NoticeTitle = styled.div`
  font-size: 12px;
  font-family: ${theme.font.semiBold};
  line-height: 14.4px;
  margin: 15px 21px 0 15px;
`;

export const NoticeContent = styled.p`
  font-size: 10px;
  font-family: ${theme.font.regular};
  color: ${theme.color.gray[65]};
  margin: 5px 25px 13px 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
