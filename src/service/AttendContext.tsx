import React, { createContext, useState, ReactNode } from 'react';

// AttendContext에서 사용할 데이터 타입 정의
interface AttendContextProps {
  attendanceData: any;
  setAttendanceData: React.Dispatch<React.SetStateAction<any>>;
  attendFetchError: string | null;
  setAttendFetchError: React.Dispatch<React.SetStateAction<string | null>>;
  hasSchedule: boolean;
  setHasSchedule: React.Dispatch<React.SetStateAction<boolean>>;
}

// 초기값 설정
const defaultContext: AttendContextProps = {
  attendanceData: null,
  setAttendanceData: () => {},
  attendFetchError: null,
  setAttendFetchError: () => {},
  hasSchedule: false,
  setHasSchedule: () => {},
};

// AttendContext
export const AttendContext = createContext<AttendContextProps>(defaultContext);

// AttendProvider
export const AttendProvider = ({ children }: { children: ReactNode }) => {
  const [attendanceData, setAttendanceData] = useState<any>(null);
  const [attendFetchError, setAttendFetchError] = useState<string | null>(null);
  const [hasSchedule, setHasSchedule] = useState<boolean>(false);

  return (
    <AttendContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        attendanceData,
        setAttendanceData,
        attendFetchError,
        setAttendFetchError,
        hasSchedule,
        setHasSchedule,
      }}
    >
      {children}
    </AttendContext.Provider>
  );
};
