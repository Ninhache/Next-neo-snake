import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/app/_components/PageHeader";
import { MDX } from "@/app/_components/mdx/mdx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  getAllArticles,
  getArroundArticle,
  getSpecificArticle,
} from "@/lib/api/articles";
import { transformTitleToPath } from "@/lib/article";
import { parseDateTime } from "@/lib/time";
import Image from "next/image";
import ArticleNavigation from "./articleNavigation";

export const revalidate = 3600;

export async function generateStaticParams(): Promise<{ path: string }[]> {
  /*
  I don't know how can I change that, since the articles number can change
  I could use an alternative function to count how many articles there's .. that's all..?
  */
  const articles = await getAllArticles({ limit: 9999 });

  return articles.map((article) => {
    return { path: transformTitleToPath(article.title) };
  });
}

export default async function Page({ params }: { params: { path: string } }) {
  const article = await getSpecificArticle(params.path);

  const { previousArticle, nextArticle } = await getArroundArticle(article);

  return (
    <section className="container relative">
      <div className="mt-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{article.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="relative mt-8 overflow-hidden">
        <Image
          src={article.image}
          width={1920}
          height={1080}
          quality={50}
          sizes="100vw"
          alt="nul"
          className="absolute z-0 rounded-t-lg opacity-10"
        />
        <PageHeader>
          <PageHeaderHeading>{article.title}</PageHeaderHeading>
          <PageHeaderDescription className="h-20">
            {article.abstract}
          </PageHeaderDescription>
        </PageHeader>
      </div>

      <div className="my-4 flex flex-col gap-4">
        <span className="flex items-center justify-center gap-2 text-gray-500">
          <Avatar>
            <AvatarImage src={`${article.authorImage}`} />
            <AvatarFallback>CT</AvatarFallback>
          </Avatar>
          By {article.authorName} · {parseDateTime(article.date, "en-US")} ·{" "}
          {article.readTime} min read
        </span>

        <ArticleNavigation
          previousArticle={previousArticle}
          nextArticle={nextArticle}
        />
      </div>

      <MDX code={article.content} />
    </section>
  );
}
