"use client";
import Link from "next/link";
import { FC } from "react";
import { NavIconProps } from "./types";
import * as Tooltip from "@radix-ui/react-tooltip";

const NavIcon: FC<NavIconProps> = ({ Icon, link }) => {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span>
            <Link
              {...link}
              className="group relative flex w-12 flex-col items-center justify-center sm:w-20"
            >
              <Icon className="mb-1 h-5 w-5 group-hover:animate-bounce group-hover:text-theme-pink-dark dark:group-hover:text-theme-pink" />
            </Link>
          </span>
        </Tooltip.Trigger>
        <Tooltip.Content className="z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
          <p className="tracking-widest">{link.title}</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default NavIcon;
