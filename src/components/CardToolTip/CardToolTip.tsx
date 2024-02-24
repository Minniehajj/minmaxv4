"use client";
import * as Tooltip from "@radix-ui/react-tooltip";
import Image, { ImageProps } from "next/image";
import { FC, Suspense, useCallback, useEffect, useState } from "react";
import { CardToolTipProps } from ".";
import { Card, Cards } from "scryfall-api";
import clsx from "clsx";

const CardImage = ({ src, alt, onLoad }: ImageProps) => {
  return <Image src={src} alt={alt} width={248} height={346} onLoad={onLoad} />;
};

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
        <Suspense>
          <Tooltip.Content className="rounded-sm">
            {data?.image_uris && (
              <CardImage
                src={data.image_uris.png}
                alt={data.name}
                onLoad={() => setIsLoading(false)}
              />
            )}
            {data?.card_faces && (
              <CardImage
                src={data.card_faces[0]?.image_uris?.png || ""}
                alt={data.name}
                onLoad={() => setIsLoading(false)}
              />
            )}
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Suspense>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
