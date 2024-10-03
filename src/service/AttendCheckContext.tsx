import React, { createContext, useState, ReactNode } from 'react';

// AttendCheckContext에서 사용할 데이터 타입 정의
interface AttendCheckContextProps {
  attendanceData: any;
  setAttendanceData: React.Dispatch<React.SetStateAction<any>>;
  attendFetchError: string | null;
  setAttendFetchError: React.Dispatch<React.SetStateAction<string | null>>;
}

// 초기값 설정
const defaultContext: AttendCheckContextProps = {
  attendanceData: null,
  setAttendanceData: () => {},
  attendFetchError: null,
  setAttendFetchError: () => {},
};

// AttendCheckContext
export const AttendCheckContext =
  createContext<AttendCheckContextProps>(defaultContext);

// AttendCheckProvider
export const AttendCheckProvider = ({ children }: { children: ReactNode }) => {
  const [attendanceData, setAttendanceData] = useState<any>(null);
  const [attendFetchError, setAttendFetchError] = useState<string | null>(null);

  return (
    <AttendCheckContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        attendanceData,
        setAttendanceData,
        attendFetchError,
        setAttendFetchError,
      }}
    >
      {children}
    </AttendCheckContext.Provider>
  );
};
