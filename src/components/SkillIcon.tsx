import React from 'react';

import Image from 'next/image';

interface SkillIconProps {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  tooltip?: string;
}

const SkillIcon = ({
  src,
  width = 64,
  height = 64,
  alt,
  tooltip,
}: SkillIconProps) => {
  if (!tooltip) {
    tooltip = alt;
  }

  return (
    <div className='tooltip' data-tip={tooltip}>
      <Image
        src={`/images/${src}`}
        width={width}
        height={height}
        alt={alt}
        className={`animate-zoom-out-center hover:animate-zoom-in-center`}
      />
    </div>
  );
};

export default SkillIcon;
