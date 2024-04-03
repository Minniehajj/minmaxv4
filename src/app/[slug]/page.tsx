import { redirect } from "next/navigation";

const RedirectedArticle = async ({ params }: { params: { slug: string } }) => {
  // if a user lands here, they should be redirected to the article page with the slug
  redirect(`/article/${params.slug}`);
};

export default RedirectedArticle;
