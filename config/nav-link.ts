export const siteConfig = {
  name: "Neo-Snake",
  url: "https://snake.ninhache.fr/",
  ogImage: "https://snake.ninhache.fr/cobra.png",
  description: "Description of the Snake",
  links: {
    github: "https://github.com/Ninhache/NeoSnake",
  },
  nav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Play",
      href: "/play",
    },
    {
      title: "Explore",
      href: "/explore",
    },
    {
      title: "Create",
      href: "/create",
    },
    {
      title: "Faq",
      href: "/faq",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
