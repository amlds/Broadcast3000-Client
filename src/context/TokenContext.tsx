import React from 'react';

interface ITokenContext {
  token: string;
  setToken: (token: string) => void;
}

export const defaultState: ITokenContext = {
  token: '',
  setToken: (token: string) => {},
};

const TokenContext = React.createContext<ITokenContext>(defaultState);

interface ITokenProviderProps {
  children: React.ReactNode;
}

const TokenProvider: React.FC<ITokenProviderProps> = ({ children }) => {
  const [token, setToken] = React.useState(defaultState.token);

  const tokenContextValue = {
    token,
    setToken,
  };

  return <TokenContext.Provider value={tokenContextValue}>{children}</TokenContext.Provider>;
};

export { TokenContext, TokenProvider };
