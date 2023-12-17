import React, { createContext, useContext, useState } from 'react';

const ToggleContext = createContext();

export const ToggleProvider = ({ children }) => {
  const [isGenreListVisible, setIsGenreListVisible] = useState(true);

  const toggleGenreList = () => {
    setIsGenreListVisible((prev) => !prev);
  };

  return (
    <ToggleContext.Provider value={{ isGenreListVisible, toggleGenreList }}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggle = () => {
  return useContext(ToggleContext);
};