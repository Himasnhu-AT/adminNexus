import { Section } from "./types.section";

export const sections: Section[] = [
  {
    title: "Getting Started",
    pages: [
      {
        title: "Introduction",
        slug: "",
        path: "./docs/introduction.md",
      },
      {
        title: "Installation",
        slug: "installation",
        path: "./docs/introduction.md",
      },
    ],
  },
  {
    title: "Basic Concepts",
    pages: [
      {
        title: "Components",
        slug: "components",
        path: "./docs/introduction.md",
      },
      { title: "Props", slug: "props", path: "./docs/introduction.md" },
      { title: "State", slug: "state", path: "./docs/introduction.md" },
    ],
  },
];
