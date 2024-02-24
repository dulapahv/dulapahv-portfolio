interface FloatiesProps {
  isReversed: boolean;
}

const Floaties = ({ isReversed = false }: FloatiesProps) => {
  return (
    <div className="hidden *:absolute *:rounded-full *:opacity-70 md:flex">
      <div
        className={`size-4 animate-shake-vertical bg-PURPLE animation-delay-1200 ${
          isReversed ? 'left-[8%]' : 'left-[90%]'
        } top-[22rem]`}
      />
      <div
        className={`size-8 animate-shake-vertical bg-RED ${
          isReversed ? 'left-[18%]' : 'left-[80%]'
        } top-[30rem]`}
      />
      <div
        className={`size-14 animate-shake-vertical bg-BLUE animation-delay-400 ${
          isReversed ? 'left-[33%]' : 'left-[65%]'
        } top-[25rem]`}
      />
      <div
        className={`size-10 animate-shake-vertical bg-YELLOW animation-delay-800 ${
          isReversed ? 'left-[43%]' : 'left-[55%]'
        } top-[30rem]`}
      />
    </div>
  );
};

export default Floaties;
