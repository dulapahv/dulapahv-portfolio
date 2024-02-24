const Floaties = () => {
  return (
    <div className="relative w-screen *:absolute *:rounded-full *:opacity-70">
      <div className="left-[8%] top-64 size-4 animate-shake-vertical bg-RED" />
      <div className="left-[13%] top-44 size-8 animate-shake-vertical bg-BLUE animation-delay-400" />
      <div className="left-[36%] top-32 size-16 animate-shake-vertical bg-YELLOW animation-delay-800" />
      <div className="left-[68%] top-32 size-12 animate-shake-vertical bg-PURPLE animation-delay-1200" />
      <div className="left-[4%] top-[640px] size-8 animate-shake-vertical bg-YELLOW animation-delay-800" />
      <div className="-left-[1%] top-[704px] size-12 animate-shake-vertical bg-PURPLE animation-delay-1200" />
      <div className="left-[26%] top-[768px] size-12 animate-shake-vertical bg-RED" />
      <div className="left-[84%] top-[848px] size-8 animate-shake-vertical bg-YELLOW animation-delay-800" />
      <div className="left-[97%] top-[512px] size-16 animate-shake-vertical bg-BLUE animation-delay-400" />
    </div>
  );
};

export default Floaties;
