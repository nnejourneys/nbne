import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";
import AvatarPost from "./post-avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Posts } from "@/.velite";

export default function PostPreview({post}: {post: Posts}) {
  return (
    <Card className="mb-5">
      <CoverImage src={post.coverImage || ""} title={post.title} />
      <CardHeader>
        <CardTitle>
          <Link
            href={`posts/${post.slug}`}
            className="text-2xl font-semibold hover:text-primary"
            title={post.title}
          >
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription>
          <DateFormatter dateString={post.date} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 mb-3">{post.excerpt}</p>
        <AvatarPost author={post.author} />
      </CardContent>
      <CardFooter>
        <Link
          href={`posts/${post.slug}`}
          className="text-2xl font-semibold hover:text-primary"
          title={post.title}
        >
          <Button>Read more</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
