import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

interface Notice {
  id: number;
  name: string;
  title: string;
  content: string;
  time: string;
  commentCount: number;
}

interface NoticeContextProps {
  notices: Notice[];
  setNotices: Dispatch<SetStateAction<Notice[]>>;
}

// 기본값을 설정하여 undefined를 방지
export const NoticeContext = createContext<NoticeContextProps>({
  notices: [],
  setNotices: () => {},
});

export const NoticeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notices, setNotices] = useState<Notice[]>([]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <NoticeContext.Provider value={{ notices, setNotices }}>
      {children}
    </NoticeContext.Provider>
  );
};
