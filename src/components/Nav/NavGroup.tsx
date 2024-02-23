"use client";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { NavIcon } from "../NavIcon";

export const NavGroup = () => {
  return (
    <ul className="flex flex-grow gap-2 sm:gap-12">
      <li>
        <NavIcon Icon={HomeIcon} link={{ href: "/", title: "Home" }} />
      </li>
      <li>
        <NavIcon
          Icon={PersonIcon}
          link={{ href: "/authors", title: "Authors" }}
        />
      </li>
      <li>
        <NavIcon
          Icon={MagnifyingGlassIcon}
          link={{ href: "/search", title: "Search" }}
        />
      </li>
    </ul>
  );
};
