import fs from "fs";
import path from "path";

import { damerauLevenshteinDistance } from "../Math";
import { metadataParser } from "../MetadataParser";
import { transformTitleToPath } from "../article";
import { ArticlePost, ArticlePreview } from "@/app/_@types/Article";
import { Nullable } from "@/app/_@types/NullableType";

interface tData {
  page?: number;
  limit?: number;
  sortDate?: "asc" | "desc";
  tags?: string[];
}

export async function getAllArticles({
  page = 1,
  limit = 6,
  sortDate = "desc",
  tags = [],
}: tData): Promise<ArticlePreview[]> {
  let data: ArticlePost[] = [];
  const articles = fs.readdirSync("articles");
  let id = 0;

  const articlePromises = articles
    .filter((article) => {
      const fileName = path.basename(article);
      return (
        path.extname(fileName).toLowerCase() === ".mdx" &&
        !fileName.startsWith("_")
      );
    })
    .map(async (article) => {
      const content = fs.readFileSync(`articles/${article}`, "utf-8");
      const { content: parsedContent, metadata } = await metadataParser(
        content
      );

      const finalArticle: ArticlePost = {
        id: id++,
        title: metadata.title,
        abstract: metadata.abstract,
        path: transformTitleToPath(metadata.title),
        date: metadata.date,
        image: metadata.image,
        tags: metadata.tags,
        authorName: metadata.authorName,
        authorImage: metadata.authorImage,
        readTime: metadata.readTime,
        content: parsedContent,
      };

      data.push(finalArticle);
    });

  await Promise.all(articlePromises);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  return data
    .filter((article) => {
      if (article.tags.length > 0) {
        return tags.every((tag) => article.tags.includes(tag));
      }
      return true;
    })
    .toSorted((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortDate === "asc" ? dateA - dateB : dateB - dateA;
    })
    .slice(startIndex, endIndex);
}

export async function getArroundArticle(article: ArticlePost): Promise<{
  previousArticle: Nullable<ArticlePreview>;
  nextArticle: Nullable<ArticlePreview>;
}> {
  const articles = await getAllArticles({ limit: 9999 });

  articles.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const currentIndex = articles.findIndex((a) => a.path === article.path);
  const previousArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  return {
    previousArticle,
    nextArticle,
  };
}

export async function getSpecificArticle(
  articlePath: string
): Promise<ArticlePost> {
  const articles = fs.readdirSync("articles");

  const filteredArticles = articles.filter((article) => {
    const fileName = path.basename(article);
    return (
      path.extname(fileName).toLowerCase() === ".mdx" &&
      !fileName.startsWith("_")
    );
  });

  for (const article of filteredArticles) {
    const content = fs.readFileSync(`articles/${article}`, "utf-8");
    const parsedMd = await metadataParser(content);
    if (transformTitleToPath(parsedMd.metadata.title) === articlePath) {
      return {
        id: -1,
        title: parsedMd.metadata.title,
        path: articlePath,
        date: parsedMd.metadata.date,
        abstract: parsedMd.metadata.abstract,
        image: parsedMd.metadata.image,
        authorName: parsedMd.metadata.authorName,
        authorImage: parsedMd.metadata.authorImage,
        tags: parsedMd.metadata.tags,
        readTime: parsedMd.metadata.readTime,
        content: parsedMd.content,
      };
    }
  }

  const similarArticles = [];
  for (const article of filteredArticles) {
    const fileContent = fs.readFileSync(`articles/${article}`, "utf-8");
    const parsedMd = await metadataParser(fileContent);
    similarArticles.push({
      parsedMd,
      distance: damerauLevenshteinDistance(
        transformTitleToPath(parsedMd.metadata.title),
        articlePath
      ),
    });
  }
  const similarArticle = similarArticles
    .sort((a, b) => a.distance - b.distance)
    .find((article) => article)?.parsedMd;

  if (similarArticle) {
    return {
      id: -1,
      title: similarArticle.metadata.title,
      path: transformTitleToPath(similarArticle.metadata.title),
      date: similarArticle.metadata.date,
      abstract: similarArticle.metadata.abstract,
      image: similarArticle.metadata.image,
      authorName: similarArticle.metadata.authorName,
      authorImage: similarArticle.metadata.authorImage,
      tags: similarArticle.metadata.tags,
      readTime: similarArticle.metadata.readTime,
      content: similarArticle.content,
    };
  } else {
    throw new Error("Internal error");
  }
}
