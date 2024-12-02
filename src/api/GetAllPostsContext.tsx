import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

interface GetAllPosts {
  id: number;
  name: string;
  title: string;
  content: string;
  time: string;
  commentCount: number;
}

interface GetAllPostsContextProps {
  posts: GetAllPosts[];
  setPosts: Dispatch<SetStateAction<GetAllPosts[]>>;
}

// 기본값을 설정하여 undefined를 방지
export const GetAllPostsContext = createContext<GetAllPostsContextProps>({
  posts: [],
  setPosts: () => {},
});

export const NoticeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<GetAllPosts[]>([]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <GetAllPostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </GetAllPostsContext.Provider>
  );
};
