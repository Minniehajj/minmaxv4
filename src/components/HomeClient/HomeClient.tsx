"use client";
import { AnimatePresence, motion } from "framer-motion";
import { PostProps } from "@/types";
import { Hero } from "../Hero";
import { MoreArticles } from "../MoreArticles";
import { useState } from "react";

const HomeClient = ({
  heroPost,
  morePosts,
  totalPages,
}: {
  heroPost: PostProps;
  morePosts: PostProps[];
  totalPages: number;
}) => {
  const [backgroundImage, setBackgroundImage] = useState<string>();
  return (
    <>
      <Hero
        title={heroPost.title}
        slug={heroPost.slug}
        setBackgroundImage={setBackgroundImage}
        image={{
          ...heroPost.heroImage,
        }}
        description={heroPost.metaDescription}
        readTime={heroPost.readTime}
        authors={heroPost.authorsCollection.items}
      />
      <MoreArticles
        data={morePosts}
        totalPages={totalPages}
        currentPage={1}
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

export default HomeClient;
