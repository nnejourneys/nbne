import React from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/styledcomps/container";
import PostHeader from "@/components/posts/post-header";
import { MDXContent } from "@/components/posts/post-body";
import { BASE_PATH, SITE_TITLE } from "@/lib/constants";
import { posts } from "@/.velite";

type Props = {
  params: {
    slug: string[];
  };
};

async function getPostBySlug(params: Props["params"]) {
  const slug = (await params).slug.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);
  return post;
}

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await props.params;
  const post = posts.find((post) => post.slug === params.slug);
  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | ${SITE_TITLE}`,
    description: post.excerpt,
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    keywords: post.keywords,
    authors: [{ name: "Roheen Browne" }, { name: "Mohan Kumar", url: "/" }],
    creator: "Mohan Kumar",
    publisher: "Roheen Browne",
    metadataBase: new URL(`${BASE_PATH}`),
    alternates: {
      canonical: `/posts/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | ${SITE_TITLE}`,
      description: post.excerpt,
      authors: ["Roheen Browne", "Mohan"],
      images: "/images/og-logo.png",
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
      },
    },
  };
};

export default async function TourPage({ params }: Props) {
  const post = await getPostBySlug(params);
  if (!post) notFound();

  if (!post) {
    notFound();
  }

  return (
    <>
      <section className="mb-0 py-1">
        <Container width="marginxy" className="mb-0">
          <article className="max-w-2xl mx-auto py-6 prose dark:prose-invert">
            {post.title && (
              <PostHeader
                slugAsParams={post.slugAsParams}
                draft={post.draft}
                title={post.title}
                coverImage={post.coverImage}
                slug={post.slug}
                author={post.author}
                date={post.date}
                body={post.body}
                gallery={post.gallery}
              />
            )}
            {post.body && <MDXContent code={post.body} />}
          </article>
        </Container>
      </section>
    </>
  );
}
