"use client";

import { PostProps } from "@/types";
import { MoreArticles } from "../MoreArticles";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PaginatedClient = ({
  posts,
  totalPages,
  params,
  authorSlug,
}: {
  posts: PostProps[];
  totalPages: number;
  params: { slug?: string; page?: number };
  authorSlug?: string;
}) => {
  const [backgroundImage, setBackgroundImage] = useState<string>();
  return (
    <>
      <MoreArticles
        data={posts}
        authorSlug={params.slug || authorSlug}
        currentPage={params.page || 1}
        totalPages={totalPages}
        setBackgroundImage={setBackgroundImage}
      />
      <AnimatePresence>
        <motion.div
          key={backgroundImage + "-background"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 1, delay: 0.25 }}
          className="fixed top-0 left-0 -z-10 h-full min-h-[1080px] w-full bg-theme-white bg-cover bg-center bg-no-repeat bg-blend-screen dark:bg-theme-black dark:bg-blend-multiply"
          style={
            backgroundImage
              ? { backgroundImage: `url(${backgroundImage})` }
              : {}
          }
        />
      </AnimatePresence>
    </>
  );
};

export default PaginatedClient;
