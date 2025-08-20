import { compareDesc } from "date-fns";
import PostItem from "@/components/posts/post-item";
import HeroPage from "@/components/page-sections/hero-page";
import { Posts, posts } from "@/.velite";
import { Container } from "@/components/styledcomps/container";

export default function PostsPage() {
  const filteredPosts: Posts[] = posts
    .filter((post) => !post.draft)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <>
      <HeroPage />
      <Container width="marginxy">
        <PostItem posts={filteredPosts} />
      </Container>
    </>
  );
}
