"use client";
import * as Tooltip from "@radix-ui/react-tooltip";
import Image from "next/image";
import { FC, useCallback, useEffect, useState } from "react";
import { CardToolTipProps } from ".";
import { Card, Cards } from "scryfall-api";
import clsx from "clsx";

export const CardToolTip: FC<CardToolTipProps> = ({
  amount,
  name,
  ...props
}) => {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const [data, setData] = useState<Card | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    const card = await Cards.byName(name, true);
    setData(card);
    return card;
  }, [name]);

  useEffect(() => {
    if (tooltipOpen) {
      setIsLoading(true);
      fetchData();
    }
  }, [fetchData, tooltipOpen]);

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root
        open={tooltipOpen}
        onOpenChange={(open) => setTooltipOpen(open)}
      >
        <Tooltip.Trigger asChild>
          <button
            className={clsx(
              `${props.className} text-theme-blue-dark dark:text-theme-blue`,
              isLoading ? "hover:cursor-wait" : "hover:cursor-auto"
            )}
            onClick={async () => {
              await fetchData();
              setTooltipOpen(!tooltipOpen);
            }}
          >
            {amount && <span>{amount} </span>}
            <span>{name}</span>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content className="rounded-sm">
          {data?.image_uris && (
            <Image
              src={data.image_uris.png}
              alt={data.name}
              width={248}
              height={346}
              onLoadingComplete={() => setIsLoading(false)}
            />
          )}
          {data?.card_faces && (
            <Image
              src={data.card_faces[0]?.image_uris?.png || ""}
              alt={data.name}
              width={248}
              height={346}
              onLoadingComplete={() => setIsLoading(false)}
            />
          )}
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
