"use client";
import BlackManaSymbol from "@/public/black_mana_symbol.svg";
import WhiteManaSymbol from "@/public/white_mana_symbol.svg";
import { useTheme } from "next-themes";

import { Theme } from ".";
import { ToggleSwitch } from "../ToggleSwitch";
import { useEffect, useState } from "react";

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = theme === Theme.dark;

  if (!mounted) return null;

  return (
    <ToggleSwitch
      onClick={() => {
        setTheme(isDark ? Theme.light : Theme.dark);
      }}
      defaultChecked={isDark}
    >
      {!isDark ? (
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
