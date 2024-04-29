"use client";
import BlackManaSymbol from "@/public/black_mana_symbol.svg";
import WhiteManaSymbol from "@/public/white_mana_symbol.svg";

import { FC, useEffect, useState } from "react";
import { Theme } from ".";
import { ToggleSwitch } from "../ToggleSwitch";

const ThemeToggleButton = () => {
  const [theme, setTheme] = useState(global.window?.__theme || "light");

  const toggleTheme = () => {
    global.window?.__setPreferredTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    global.window.__onThemeChange = setTheme;
  }, []);

  return (
    <ToggleSwitch onClick={toggleTheme} defaultChecked={theme === Theme.dark}>
      {theme !== Theme.dark ? (
        <span>
          <WhiteManaSymbol />
          <span className="sr-only">Light theme</span>
        </span>
      ) : (
        <span>
          <BlackManaSymbol />
          <span className="sr-only">Dark theme</span>
        </span>
      )}
    </ToggleSwitch>
  );
};

export default ThemeToggleButton;
