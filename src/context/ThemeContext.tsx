import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "src/hooks/useLocalStorage";
import { darkTheme, theme } from "src/style/theme";
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

export const useThemeContext = () => useContext(ThemeContext);
export const useThemeUpdateContext = () => useContext(ThemeUpdateContext);

export const ThemeContextProvider = ({ children }: React.PropsWithChildren) => {
  const { value: currentTheme, setValue: setCurrentTheme } = useLocalStorage({ key: "Theme", initialValue: "light" });

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {}, []);

  return (
    <ThemeContext.Provider value={{ currentTheme }}>
      <ThemeUpdateContext.Provider value={{ toggleTheme }}>
        <ThemeProvider theme={currentTheme === "light" ? theme : darkTheme}>{children}</ThemeProvider>
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};
