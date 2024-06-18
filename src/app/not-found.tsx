import { HomeButton } from "@/ui/home-button";

export default function NotFound() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold">Page Not Found</h1>
      </header>
      <main className="space-y-4">
        <p className="text-default-600">
          Sorry, the page you are looking for does not exist. Please check the
          URL and try again.
        </p>
        <HomeButton />
      </main>
      <footer className="border-t-1 border-default-300 pt-6 text-default-500 dark:border-default-100">
        <p>Details:</p>
        <code className="text-sm sm:text-base">
          Status: 404
          <br />
          {`Timestamp: ${new Date().toLocaleString()} (${new Date().toISOString()})`}
        </code>
      </footer>
    </div>
  );
}
