// File: UserContext.js

import React, { createContext, useState } from 'react';
import userReducer from '../reducers';
import { getUserFromStore } from '../actions/loginAction';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
