import React, { createContext, useState } from 'react';

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ loading: true, data: true });
// we will use loading later


  const setAuthData = (data) => {
    setAuth({
        data
    });
  };
 // a function that will help us to add the user data in the auth;
  return (
    <authContext.Provider value={{ auth, setAuthData }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;