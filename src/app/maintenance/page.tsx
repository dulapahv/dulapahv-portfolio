import { ReloadButton } from "@/components";

const page = ({
  searchParams,
}: {
  searchParams?: {
    path: string;
    reason: string;
  };
}) => {
  const path = searchParams?.path || "/";
  const reason = searchParams?.reason || "Unknown Reason";

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold">Under Maintenance</h1>
      </header>
      <main className="space-y-4">
        <p className="text-default-600">
          Sorry, this page is currently under maintenance. Please try again
          later.
        </p>
        <ReloadButton />
      </main>
      <footer className="border-t-1 border-default-300 pt-6 text-default-500 dark:border-default-100">
        <p>Details:</p>
        <code className="text-sm sm:text-base">
          Status: 503 Service Unavailable
          <br />
          {`Timestamp: ${new Date().toLocaleString()} (${new Date().toISOString()})`}
          <br />
          {`Reason: ${reason}`}
          <br />
          {`Path: ${path}`}
        </code>
      </footer>
    </div>
  );
};

export default page;
