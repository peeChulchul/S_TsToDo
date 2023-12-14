import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import useLocalStorage from "src/hooks/useLocalStorage";
import { theme } from "src/style/theme";
import { ThemeProvider } from "styled-components";

interface IThemeContextValue {
  currentTheme: any;
}
interface IThemeUpdateContextValue {
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContextValue>({ currentTheme: [] });
const ThemeUpdateContext = createContext<IThemeUpdateContextValue>({
  toggleTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);
export const useThemeUpdate = () => useContext(ThemeUpdateContext);

export const ThemeContextProvider = ({ children }: React.PropsWithChildren) => {
  const { value: currentTheme, setValue: setCurrentTheme } = useLocalStorage({ key: "Theme", initialValue: [] });
  const [throttle, setThrottle] = useState("");

  console.log(currentTheme);

  const toggleTheme = () => {
    console.log(currentTheme);
    // setCurrentTheme();
  };

  useEffect(() => {}, []);

  return (
    <ThemeContext.Provider value={{ currentTheme }}>
      <ThemeUpdateContext.Provider value={{ toggleTheme }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};
