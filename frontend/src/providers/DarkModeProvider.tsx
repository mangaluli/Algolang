import React, {
  createContext,
  useState,
  useContext,
  FunctionComponent,
  useEffect,
} from "react";

interface DarkModeContextProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

const DarkModeContext = createContext<DarkModeContextProps>({
  darkMode: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDarkMode: () => {},
});

export const DarkModeProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("algolangdarkmode") === "true") {
      setDarkMode(true);
    }

    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = (): DarkModeContextProps => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
