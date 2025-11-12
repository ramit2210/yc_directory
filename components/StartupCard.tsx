import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { formatDate } from "@/lib/utils";

type StartupCardType = {
  createdAt: string;
  views?: number | null;
  author?: {
    id: string | number;
    name: string;
    image?: string | null;
  } | null;
  title: string;
  category?: string | null;
  id: string | number;
  image?: string | Blob | undefined;
  description?: string | null;
};

const StartupCard = ({ post }: { post: StartupCardType }) => {
  const { createdAt, views, author, title, category, id, image, description } =
    post;
  const viewsCount = views ?? 0;
  const authorId = author?.id;
  const authorName = author?.name ?? "Unknown";
  const authorImage = author?.image ?? null;
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="start_card_date">{formatDate(createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{viewsCount}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${authorId}`}>
            <p className="text-16-medium line-clamp-1">{authorName}</p>
          </Link>
          <Link href={`/startup/${id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${authorId}`}>
          <Image
            src={authorImage || "/placeholder-avatar.png"}
            alt="placeholder"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>
      <Link href={`/startup/${id}`}>
        <p className="startup-card_desc">{description}</p>
        <img src={image} alt="placeholder" className="startup-card_img" />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};
export default StartupCard;
