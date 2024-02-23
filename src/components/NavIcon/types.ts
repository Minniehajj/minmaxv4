import { LinkProps } from "@/types";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";

export type NavIconProps = {
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  link: LinkProps;
};
