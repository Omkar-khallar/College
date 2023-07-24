"use client";
import React, { createContext, useState } from "react";

export const ToogleContext = createContext();
// export const ToogleMode = createContext();

export const ToogleProvider = ({ children }) => {
  const [toogle, setToogle] = useState(true);

  const tooogleMenuLink = () => {
    setToogle((prev) => (prev === false ? true : false));
  };

  return (
    <ToogleContext.Provider value={{ toogle, tooogleMenuLink }}>
      {children}
    </ToogleContext.Provider>
  );
};

// export const ModeProvider = ({ children }) => {
//   const [mode, setMode] = useState("dark");
//   const lightDarkMode = () => {
//     setMode((prev) => (prev === "dark" ? "light" : "dark"));
//   };

//   return (
//     <ToogleMode.Provider value={{ lightDarkMode, mode }}>
//       <div className={`theam ${mode} `}>{children}</div>
//     </ToogleMode.Provider>
//   );
// };
