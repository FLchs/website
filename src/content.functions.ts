import { getCollection } from "astro:content";

export async function getBlogPosts() {
  const posts = await getCollection("blog");

  return posts
    .filter(
      (post) => !post.data.draft || import.meta.env.MODE === "development",
    )
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
