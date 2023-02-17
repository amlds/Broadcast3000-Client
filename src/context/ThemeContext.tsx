import React from 'react';

interface IThemeContext {
  theme: boolean;
  toggleTheme: () => void;
}

const defaultState = {
  theme: false,
};

const ThemeContext = React.createContext(defaultState as IThemeContext);

export default ThemeContext;
