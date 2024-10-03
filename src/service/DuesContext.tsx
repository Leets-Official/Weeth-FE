import React, { createContext, useState, ReactNode } from 'react';

// DuesContext 타입
interface DuesContextProps {
  duesData: any[];
  setDuesData: React.Dispatch<React.SetStateAction<any[]>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  totalAmount: number;
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
  currentAmount: number;
  setCurrentAmount: React.Dispatch<React.SetStateAction<number>>;
  myCardinal: number;
  setCardinal: React.Dispatch<React.SetStateAction<number>>;
  time: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
}

// 기본 값 설정
const defaultDuesContext: DuesContextProps = {
  duesData: [],
  setDuesData: () => {},
  description: '',
  setDescription: () => {},
  totalAmount: 0,
  setTotalAmount: () => {},
  currentAmount: 0,
  setCurrentAmount: () => {},
  myCardinal: 0,
  setCardinal: () => {},
  time: '',
  setTime: () => {},
};

// 컨텍스트
export const DuesContext = createContext<DuesContextProps>(defaultDuesContext);

// DuesProvider
export const DuesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [duesData, setDuesData] = useState<any[]>([]);
  const [description, setDescription] = useState<string>('');
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [currentAmount, setCurrentAmount] = useState<number>(0);
  const [time, setTime] = useState<string>('');
  const [myCardinal, setCardinal] = useState<number>(0);

  return (
    <DuesContext.Provider
      value={{
        duesData,
        setDuesData,
        description,
        setDescription,
        totalAmount,
        setTotalAmount,
        currentAmount,
        setCurrentAmount,
        myCardinal,
        setCardinal,
        time,
        setTime,
      }}
    >
      {children}
    </DuesContext.Provider>
  );
};
