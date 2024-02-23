"use client";
import BlackManaSymbol from "@/public/black_mana_symbol.svg";
import WhiteManaSymbol from "@/public/white_mana_symbol.svg";

import { FC, useState } from "react";
import { Theme, ThemeToggleButtonProps } from ".";
import { ToggleSwitch } from "../ToggleSwitch";

const ThemeToggleButton: FC<ThemeToggleButtonProps> = ({ theme }) => {
  const [_theme, setTheme] = useState<Theme>(theme);
  const toggleTheme = () => {
    const root = document.getElementsByTagName("html")[0];
    root.classList.toggle(Theme.dark);
    if (root.classList.contains(Theme.dark)) {
      setTheme(Theme.dark);
      document.cookie = `theme=${Theme.dark}`;
    } else {
      setTheme(Theme.light);
      document.cookie = `theme=${Theme.light}`;
    }
  };
  return (
    <ToggleSwitch onClick={toggleTheme}>
      {_theme === Theme.light ? (
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
