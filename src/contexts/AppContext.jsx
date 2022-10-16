import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = props => {
  const { children } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const logIn = () => {
    setIsLoggedIn(true);
    setUsername('Mango');
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUsername(null);
  };

  return (
    <AppContext.Provider value={{ isLoggedIn, username, logIn, logOut }}>
      {children}
    </AppContext.Provider>
  );
};
