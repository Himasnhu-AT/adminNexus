interface Page {
  title: string;
  slug: string;
  path: string;
}

export interface Section {
  title: string;
  pages: Page[];
}
