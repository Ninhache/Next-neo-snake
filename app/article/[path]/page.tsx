import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/app/_components/PageHeader";
import { MDX } from "@/app/_components/mdx/mdx";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ArticleNavigation from "./articleNavigation";
import { parseDateTime } from "@/lib/time";

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

      <PageHeader>
        <PageHeaderHeading>{article.title}</PageHeaderHeading>
        <PageHeaderDescription className="h-20">
          {article.abstract}
        </PageHeaderDescription>

        <span className="flex items-center gap-2 text-gray-500">
          <Avatar>
            <AvatarImage
              src={article.authorImage}
              className="scale-75 opacity-70"
            />
            <AvatarFallback>CT</AvatarFallback>
          </Avatar>
          By {article.authorName} · {parseDateTime(article.date, "en-US")} ·{" "}
          {article.readTime} min read
        </span>

        <ArticleNavigation
          previousArticle={previousArticle}
          nextArticle={nextArticle}
        />
      </PageHeader>

      <MDX code={article.content} />
    </section>
  );
}
