import { Breadcrumb } from "@/components";

const Page = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <Breadcrumb />
      <header className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">Contact</h1>
        <p className="text-lg text-default-500">
          Let me know what's on your mind and I'll get back to you as soon as
          possible.
        </p>
      </header>
    </div>
  );
};

export default Page;
