import { getCollection } from "astro:content";

export async function getBlogPosts() {
  const posts = await getCollection("blog");

  return posts
    .filter(
      (post) => !post.data.draft || import.meta.env.MODE === "development",
    )
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
export async function getProjectsPosts() {
  const posts = await getCollection("projects");

  // Filter out drafts in production
  const validPosts = posts.filter(
    (post) => !post.data.draft || import.meta.env.MODE === "development",
  );

  // Sort by publication date descending
  validPosts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  // Group by company
  const grouped: Record<string, typeof posts> = {};
  for (const post of validPosts) {
    const company = post.id.split("/")[0];
    if (!grouped[company]) grouped[company] = [];
    grouped[company].push(post);
  }

  return grouped;
}
