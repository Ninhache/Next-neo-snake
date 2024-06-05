import { MDXRemote } from "next-mdx-remote/rsc";
import { FunctionComponent, ReactNode } from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { NextComponents, PrimitiveComponents } from "./mdxComponents";

const components: Record<
  PropertyKey,
  (...args: any[]) => JSX.Element | ReactNode
> = {
  ...PrimitiveComponents,
  ...NextComponents,
};

interface Props {
  code: string;
}

export const MDX: FunctionComponent<Props> = ({ code }) => {
  return (
    <article className="mdx break-word">
      <MDXRemote
        source={code}
        components={components}
        options={{
          parseFrontmatter: true,
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              rehypeAutolinkHeadings,
              rehypeRaw,
              rehypePrettyCode,
            ],
          },
        }}
      />
    </article>
  );
};
