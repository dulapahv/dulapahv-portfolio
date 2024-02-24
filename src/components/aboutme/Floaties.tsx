const Floaties = () => {
  return (
    <div className="relative w-screen *:absolute *:rounded-full *:opacity-70">
      <div className="left-[3%] top-[33rem] size-4 animate-shake-vertical bg-PURPLE animation-delay-1200" />
      <div className="left-[5%] top-[39rem] size-8 animate-shake-vertical bg-RED" />
      <div className="left-[2%] top-[45rem] size-14 animate-shake-vertical bg-BLUE animation-delay-400" />
      <div className="left-[8%] top-[50rem] size-10 animate-shake-vertical bg-YELLOW animation-delay-800" />
    </div>
  );
};

export default Floaties;
