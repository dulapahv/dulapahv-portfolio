import { NAME } from "@/lib/constants";

export default function Home() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">{NAME}</h1>
        <p className="text-lg text-default-500">
          Fullstack Developer · UX/UI · Video Games
        </p>
      </header>
      <main className="text-default-500">
        <p>
          Hi, I&apos;m Dulapah Vibulsanti. I&apos;m a Thai Software Engineer
          currently based in Glasgow, Scotland.
        </p>
      </main>
    </div>
  );
}
