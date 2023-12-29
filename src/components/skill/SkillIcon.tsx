import { useState } from 'react';

import Image from 'next/image';
import { Skeleton, Tooltip } from '@nextui-org/react';

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
  const [isLoaded, setIsLoaded] = useState(false);

  if (!tooltip) {
    tooltip = alt;
  }

  return (
    <Tooltip
      content={tooltip}
      closeDelay={75}
      classNames={{
        content: 'selection:bg-fuchsia-300 selection:text-fuchsia-900',
      }}
    >
      <Skeleton
        isLoaded={isLoaded}
        classNames={{
          base: 'animate-zoom-out-center hover:animate-zoom-in-center',
        }}
      >
        <Image
          src={`/images/${src}`}
          width={width}
          height={height}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
        />
      </Skeleton>
    </Tooltip>
  );
};

export default SkillIcon;
