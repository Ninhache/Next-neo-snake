import { siteConfig } from "@/config/nav-link";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "./_components/PageHeader";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Icons } from "./_components/icons";

export default function Home() {
  return (
    <div className="container relative">
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
        <PageActions>
          <Link href="/docs" className={cn(buttonVariants(), "w-24")}>
            <Icons.play className="scale-75" />
            <span className="px-1">Play</span>
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={cn(buttonVariants({ variant: "outline" }), "w-24 gap-2")}
          >
            <Icons.brush className="scale-150" />
            <span>Create</span>
          </Link>
        </PageActions>
      </PageHeader>

      <section>home page :D</section>
    </div>
  );
}
