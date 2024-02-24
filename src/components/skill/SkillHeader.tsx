interface SkillHeaderProps {
  text: string;
}

const SkillHeader = ({ text }: SkillHeaderProps) => {
  return (
    <h1 className='relative flex items-center gap-x-2 text-base text-BLACK [text-shadow:0_0_5px_#f7f7f7] before:content-["<"] after:content-[">"] sm:text-lg dark:text-WHITE'>
      {text}
      <div className="absolute -bottom-2 left-0 w-32">
        <div className="grid grid-cols-4 *:h-[2px]">
          <div className="bg-RED" />
          <div className="bg-BLUE" />
          <div className="bg-YELLOW" />
          <div className="bg-PURPLE" />
        </div>
      </div>
    </h1>
  );
};

export default SkillHeader;
