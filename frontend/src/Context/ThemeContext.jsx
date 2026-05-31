import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'color');

  useEffect(() => {
    const root = document.documentElement;
    // Remove previous classes
    root.classList.remove('theme-mono-light', 'theme-mono-dark', 'theme-dark');
    
    if (theme === 'mono-light') {
      root.classList.add('theme-mono-light');
    } else if (theme === 'mono-dark') {
      root.classList.add('theme-mono-dark');
    } else if (theme === 'dark') {
      root.classList.add('theme-dark');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (nextTheme) => {
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
