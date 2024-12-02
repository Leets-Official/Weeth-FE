import theme from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: ${theme.font.regular};
  color: ${theme.color.gray[100]};
`;

export const Header = styled.div`
  margin-left: 8%;
`;

export const SemiTitle = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 25px;
  font-size: 16px;
`;

export const Penalty = styled.div`
  margin-top: 19px;
  font-size: 32px;
`;

export const SemiBold = styled.div`
  font-family: ${theme.font.semiBold};
  include-font-padding: false;
  display: flex;
  flex-direction: row;
`;

export const StyledBox = styled.div`
  background-color: ${theme.color.gray[18]};
  border-radius: 10px;
  margin: 26px 4% 0 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 92%;
`;

export const SmallStyledBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 92%;
  margin: 15px 4% 0 4%;
`;

export const SmallStyledBox = styled.div`
  background-color: ${theme.color.gray[30]};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95px;
  height: 93px;
  text-align: center;
`;

export const SmallBoxTitle = styled.div`
  margin-top: 15px;
  font-size: 14px;
`;

export const SmallBoxNum = styled.div`
  margin-top: 20px;
  font-size: 18px;
  font-family: ${theme.font.semiBold};
`;

export const Line = styled.div`
  width: 94%;
  height: 1px;
  background-color: ${theme.color.gray[30]};
  margin: 30px 3% 0 3%;
`;

export const MeetingInfoBox = styled.div`
  background-color: ${theme.color.gray[18]};
  border-radius: 10px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

export const MeetingHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 5%;
  width: 95%;
`;

export const MeetingTitle = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2%;
  font-size: 16px;
  font-family: ${theme.font.semiBold};
`;

export const MeetingInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 13px 5% 0 5%;
  font-size: 14px;
  line-height: 1.7;
`;

export const StyledText = styled.div`
  margin-top: -2.5px;
`;

export const NullBox = styled.div`
  margin: 20px 0;
`;
