import NavSVG from "@/public/minmax_rgb.svg";
import Link from "next/link";
import { NavGroup } from "./NavGroup";
import dynamic from "next/dynamic";

const ThemeToggleButton = dynamic(
  () => import("../ThemeToggleButton/ThemeToggleButton"),
  {
    ssr: false,
  }
);

export const Nav = () => {
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
          <ThemeToggleButton />
        </div>
      </nav>
    </header>
  );
};
