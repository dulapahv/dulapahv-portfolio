import { Breadcrumb } from "@/components";

const Page = () => {
  return (
    <div className="space-y-6">
      <Breadcrumb />
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Stack</h1>
        <p className="text-lg text-default-500">
          Tools and technologies I use.
        </p>
      </header>
    </div>
  );
};

export default Page;