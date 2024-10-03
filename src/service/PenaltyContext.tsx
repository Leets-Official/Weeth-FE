import React, { createContext, useState, ReactNode } from 'react';

// PenaltyContext 타입
interface PenaltyContextProps {
  myPenaltyCount: number;
  setMyPenalty: React.Dispatch<React.SetStateAction<number>>;
  penaltyData: any;
  setPenaltyData: React.Dispatch<React.SetStateAction<any>>;
  penaltyFetchError: string | null;
  setPenaltyFetchError: React.Dispatch<React.SetStateAction<string | null>>;
}

// 기본 값 설정
const defaultPenaltyContext: PenaltyContextProps = {
  myPenaltyCount: 0,
  setMyPenalty: () => {},
  penaltyData: null,
  setPenaltyData: () => {},
  penaltyFetchError: null,
  setPenaltyFetchError: () => {},
};

// 컨텍스트
export const PenaltyContext = createContext<PenaltyContextProps>(
  defaultPenaltyContext,
);

// PenaltyProvider
export const PenaltyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [penaltyData, setPenaltyData] = useState<any>(null);
  const [penaltyFetchError, setPenaltyFetchError] = useState<string | null>(
    null,
  );
  const [myPenaltyCount, setMyPenalty] = useState<number>(0);

  return (
    <PenaltyContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        myPenaltyCount,
        setMyPenalty,
        penaltyData,
        setPenaltyData,
        penaltyFetchError,
        setPenaltyFetchError,
      }}
    >
      {children}
    </PenaltyContext.Provider>
  );
};
