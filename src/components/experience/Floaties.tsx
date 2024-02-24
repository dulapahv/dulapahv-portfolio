interface FloatiesProps {
  isReversed: boolean;
}

const Floaties = ({ isReversed = false }: FloatiesProps) => {
  return (
    <div className="relative w-screen *:absolute *:rounded-full *:opacity-70">
      <div
        className={`size-4 animate-shake-vertical bg-PURPLE animation-delay-1200 ${
          isReversed ? 'left-[96%]' : 'left-[3%]'
        } top-[13rem]`}
      />
      <div
        className={`size-8 animate-shake-vertical bg-RED ${
          isReversed ? 'left-[93.5%]' : 'left-[5%]'
        } top-[19rem]`}
      />
      <div
        className={`size-14 animate-shake-vertical bg-BLUE animation-delay-400 ${
          isReversed ? 'left-[95%]' : 'left-[2%]'
        } top-[25rem]`}
      />
      <div
        className={`size-10 animate-shake-vertical bg-YELLOW animation-delay-800 ${
          isReversed ? 'left-[90%]' : 'left-[8%]'
        } top-[30rem]`}
      />
    </div>
  );
};

export default Floaties;
