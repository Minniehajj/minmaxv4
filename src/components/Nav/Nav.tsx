import NavSVG from "@/public/minmax_rgb.svg";
import Link from "next/link";
import {
  HomeIcon,
  PersonIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { NavIcon } from "../NavIcon";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";
import { cookies } from "next/headers";
import { Theme } from "../ThemeToggleButton";
import { NavGroup } from "./NavGroup";

export const Nav = () => {
  const theme =
    cookies().get("theme")?.value === "dark" ? Theme.dark : Theme.light;

  return (
    <header className="">
      <nav className="flex items-center justify-between">
        <div className="">
          <Link
            href="/"
            className="flex text-theme-black transition-colors hover:text-gray-300 dark:text-theme-white"
            title="Home"
          >
            <NavSVG className="h-20 w-20 fill-current sm:h-40 sm:w-40" />
          </Link>
        </div>
        <div className="flex flex-grow gap-2 sm:gap-12">
          <NavGroup />
          <ThemeToggleButton theme={theme} />
        </div>
      </nav>
    </header>
  );
};
