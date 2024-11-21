import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

interface UserContextType {
  userData: any;
  setUserData: Dispatch<SetStateAction<any>>;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
}

const defaultContext: UserContextType = {
  userData: null,
  setUserData: () => {},
  error: null,
  setError: () => {},
};

export const UserContext = createContext<UserContextType>(defaultContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <UserContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        userData,
        setUserData,
        error,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
