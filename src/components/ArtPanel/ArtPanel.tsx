"use client";

import { useEffect, useState } from "react";

const ArtPanel = () => {
  const [cookieValue, setCookieValue] = useState<string>();

  useEffect(() => {
    const checkCookie = () => {
      const documentCookie = document?.cookie
        .split("; ")
        .find((row) => row.startsWith("backgroundImage="))
        ?.split("=")[1];

      if (cookieValue) {
        setCookieValue(documentCookie);
      }
    };

    window.setInterval(checkCookie, 100); // run every 100 ms
  }, [cookieValue]);
  return (
    <div
      className="fixed w-screen h-screen top-0 left-0 bg-cover bg-center bg-no-repeat bg-blend-screen dark:bg-blend-multiply "
      style={{
        backgroundImage: `url(${cookieValue})`,
      }}
    ></div>
  );
};

export default ArtPanel;
