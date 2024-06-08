import { Breadcrumb } from "@/components";

const Page = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <Breadcrumb />
      <header className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">Blog</h1>
        <p className="text-lg text-default-500">
          Blog posts about my thoughts, ideas, and experiences.
        </p>
      </header>
    </div>
  );
};

export default Page;
