import { ArticlePreview } from "@/app/_@types/Article";
import { Nullable } from "@/app/_@types/NullableType";
import { Icons } from "@/app/_components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ArticleNavigation({
  previousArticle,
  nextArticle,
}: {
  previousArticle: Nullable<ArticlePreview>;
  nextArticle: Nullable<ArticlePreview>;
}) {
  return (
    <span className="group relative inline-flex h-10 w-full items-center gap-2">
      <span className="flex w-1/2 justify-end">
        {previousArticle ? (
          <Link
            href={previousArticle.path}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "relative flex w-auto justify-end overflow-hidden transition-all hover:pl-24",
            )}
          >
            <span className="absolute right-16">Previous</span>
            <Icons.leftArrow />
          </Link>
        ) : (
          <span
            className={cn(
              buttonVariants({ variant: "outline" }),
              "relative flex w-auto cursor-not-allowed justify-end overflow-hidden opacity-30 transition-all",
            )}
          >
            <span className="absolute right-16">Previous</span>
            <Icons.leftArrow />
          </span>
        )}
      </span>

      <span className="flex w-1/2 justify-start">
        {nextArticle ? (
          <Link
            href={nextArticle.path}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "relative flex w-auto justify-end overflow-hidden transition-all hover:pr-24",
            )}
          >
            <Icons.rightArrow />
            <span className="absolute left-16">Next</span>
          </Link>
        ) : (
          <span
            className={cn(
              buttonVariants({ variant: "outline" }),
              "relative flex w-auto cursor-not-allowed justify-end overflow-hidden opacity-30 transition-all",
            )}
          >
            <Icons.rightArrow />
            <span className="absolute left-16">Next</span>
          </span>
        )}
      </span>
    </span>
  );
}
