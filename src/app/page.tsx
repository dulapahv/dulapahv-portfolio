const Home = async () => {
  return (
    <div className="flex flex-col gap-y-8">
      <header className="mt-40 flex flex-col gap-y-2">
        <h1 className="text-3xl font-semibold">Dulapah Vibulsanti</h1>
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
};

export default Home;
