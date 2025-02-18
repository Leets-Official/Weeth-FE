import theme from '@/styles/theme';
import styled from 'styled-components';

export const StyledAttend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: ${theme.font.regular};
  include-font-padding: false;
`;

export const Progress = styled.div<{ $attendPercent: number }>`
  width: 325px;
  height: 19px;
  background-color: ${({ $attendPercent }) =>
    $attendPercent === 0 ? theme.color.gray[20] : theme.color.negative};
  border-radius: 10px;
  overflow: hidden;
  margin: 5% 10px 0px 10px;
`;

export const Dealt = styled.div<{ $dealt: number }>`
  width: ${(props) => `${props.$dealt}%`};
  height: 100%;
  border-radius: 10px;
  background-color: ${theme.color.main};
`;

export const StyledBox = styled.div`
  width: 315px;
  background-color: ${theme.color.gray[18]};
  border-radius: 10px;
  padding: 15px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const SemiBold = styled.div`
  font-family: ${theme.font.semiBold};
  include-font-padding: false;
  display: flex;
  flex-direction: row;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const RightButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const PenaltyInfo = styled.div`
  color: ${theme.color.gray[65]};
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 1.6;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 97%;
  margin-right: 3%;
`;

export const AttendPercent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 86%;
  position: relative;
  font-size: 32px;
  margin-top: 5%;
`;

export const PenaltyContainer = styled.div`
  width: 100%;
`;

export const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  margin-top: 6.6%;
`;

export const AttendText = styled.div`
  margin-top: -2px;
`;

export const PenaltyCount = styled.div`
  margin-top: 15px;
  font-size: 14px;
  line-height: 1.8;
`;

export const NoPenaltyInfo = styled.div`
  margin-top: 15px;
  font-size: 16px;
`;

export const AttendProject = styled.div`
  margin-top: 20px;
  font-size: 16px;
`;

export const AttendDate = styled.div`
  margin-top: 15px;
  font-size: 14px;
`;

export const AttendPlace = styled.div`
  margin-top: 15px;
  font-size: 14px;
`;

export const AttendButton = styled.div`
  margin-top: 20px;
`;

export const AttendName = styled.div`
  margin-top: -2px;
`;
