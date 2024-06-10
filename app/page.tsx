import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { getAllArticles } from "@/lib/api/articles";
import { capitalize } from "@/lib/text";
import { parseDateTime } from "@/lib/time";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "./_components/PageHeader";
import { Icons } from "./_components/icons";

export default async function Home() {
  const articles = await getAllArticles({ limit: 6 });

  return (
    <div className="container relative z-0">
      <PageHeader>
        <PageHeaderHeading className="hidden md:block">
          Discover the Snake Revolution
        </PageHeaderHeading>
        <PageHeaderHeading className="md:hidden">
          Discover the Snake Revolution
        </PageHeaderHeading>
        <PageHeaderDescription>
          One of the most iconic games redesigned in speedrun mode
          <br />
          Play and create your own maps for endless fun and challenge
        </PageHeaderDescription>
        <PageActions className="z-30">
          <Link href="/play" className={cn(buttonVariants(), "w-24")}>
            <Icons.play className="scale-75" />
            <span className="px-1">Play</span>
          </Link>
          <Link
            href={"/create"}
            className={cn(buttonVariants({ variant: "outline" }), "w-24 gap-2")}
          >
            <Icons.brush className="scale-150" />
            <span>Create</span>
          </Link>
        </PageActions>
      </PageHeader>

      <div className="absolute left-1/2 top-72 z-0 h-24 w-5/6 -translate-x-1/2 rounded-full bg-primary/25 blur-2xl lg:top-96 lg:blur-3xl"></div>

      <section className="z-30 flex flex-wrap justify-center gap-x-2 gap-y-4">
        {articles.map((article) => (
          <article
            key={article.id}
            className="group z-30 flex w-custom-full overflow-hidden rounded-lg border bg-secondary text-card-foreground sm:w-custom-1/2 md:w-custom-1/3"
          >
            <Link href={`/article/${article.path}`} prefetch={false}>
              <div className="flex h-full flex-col gap-3">
                <div className="relative h-48 overflow-hidden border-b-2">
                  <Image
                    src={`${article.image}`}
                    alt={`${article.title}`}
                    quality={50}
                    width={600}
                    height={150}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="transform transition-transform group-hover:scale-110"
                  />
                </div>
                <div className="mx-5 mb-5 mt-2 flex h-full flex-col">
                  <div className="h-full">
                    <h1 className="text-center font-bold">{article.title}</h1>
                    <p className="mt-4 text-gray-400">{article.abstract}</p>
                  </div>
                  <div className="mb-2 flex flex-grow justify-center gap-2">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="mr-1 rounded-md border border-foreground bg-primary-foreground bg-opacity-40 p-1 text-xs font-bold"
                      >
                        {capitalize(tag)}
                      </span>
                    ))}
                  </div>
                  <div className="z-40 mx-16 my-2 h-1 border-b border-primary/10"></div>
                  <div className="flex items-center gap-2 rounded-md bg-opacity-60 p-2">
                    <Avatar>
                      <AvatarImage src={`${article.authorImage}`} />
                      <AvatarFallback>CT</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-bold">{article.authorName}</p>
                      <p className="text-gray-500">
                        {parseDateTime(article.date, "en-EN")} -{" "}
                        {article.readTime} min read
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
