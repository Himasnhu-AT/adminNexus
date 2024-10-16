import { MDXRemote } from "next-mdx-remote/rsc";

type MainContentProps = {
  content: string;
};

export default function MainContent({ content }: MainContentProps) {
  return (
    <div className="flex-1 p-8 overflow-y-auto prose prose-blue max-w-none">
      <MDXRemote source={content} />
    </div>
  );
}
