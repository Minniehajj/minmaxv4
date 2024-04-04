"use client";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { useSearchBox } from "react-instantsearch";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export const SearchBox = () => {
  const { query, refine, clear } = useSearchBox();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const setQuery = (value: string) => {
    setInputValue(value);
    refine(value);
  };
  return (
    <form
      action=""
      role="search"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        if (inputRef.current) {
          inputRef.current.blur();
        }
      }}
      onReset={(event) => {
        event.preventDefault();
        event.stopPropagation();

        setQuery("");

        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
      className="flex gap-2"
    >
      <Input
        type="search"
        ref={inputRef}
        value={inputValue}
        onChange={(event) => {
          setQuery(event.currentTarget.value);
        }}
      />

      <Button type="submit" aria-label="Start Search">
        <MagnifyingGlassIcon />
      </Button>
    </form>
  );
};
