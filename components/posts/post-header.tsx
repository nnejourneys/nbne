import DateFormatter from "./date-formatter"; 
import { H1 } from "../ui/h1"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PostImage from "./post-image";
import { Posts } from "@/.velite";

export default function PostHeader({
  title,
  coverImage, 
  author,
  date,
}: Posts) {
  return (
    <>
      {title && <H1>{title}</H1>}
      {coverImage &&
      <PostImage 
        src={coverImage} 
        title={title}
        width={556}
        height={370}
      />}

      {author && (
        <div className="my-5">
          {author.map((item, index) => (
            <div key={index}>
              <Avatar>
                <AvatarImage src={item.picture} />
                <AvatarFallback>{item.initials}</AvatarFallback>
              </Avatar>
              <p className="font-semibold text-md my-3">{item.name}</p>
            </div>
          ))}
          <div className="mb-5 text-muted-foreground">
            <DateFormatter dateString={date} />
          </div>
        </div>
      )}
    </>
  );
}
