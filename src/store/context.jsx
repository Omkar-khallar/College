"use client";
import React, { createContext, useState } from "react";

export const ToogleContext = createContext();

export const ToogleProvider = ({ children }) => {
  const [toogle, setToogle] = useState(true);
  const [mode, setMode] = useState(true);

  const tooogleMenuLink = () => {
    setToogle((prev) => (prev === false ? true : false));
  };

  const lightDarkMode = () => {
    setMode((prev) => (prev === true ? false : true));
  };

  return (
    <ToogleContext.Provider
      value={{ toogle, tooogleMenuLink, lightDarkMode, mode }}
    >
      {children}
    </ToogleContext.Provider>
  );
};
