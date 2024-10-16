import MainContent from "../docsContent";
import { getMdFromSlug } from "../getMdFromSlug";

export default async function Home() {
  const md: string = await getMdFromSlug("");

  return (
    <div className="flex h-full">
      <MainContent content={md} />
    </div>
  );
}
