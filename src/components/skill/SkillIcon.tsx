import { useState } from 'react';

import { Skeleton, Tooltip } from '@nextui-org/react';
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
  const [isLoaded, setIsLoaded] = useState(false);

  if (!tooltip) {
    tooltip = alt;
  }

  return (
    <Tooltip content={tooltip} closeDelay={75}>
      <Skeleton
        isLoaded={isLoaded}
        classNames={{
          base: 'animate-zoom-out-center hover:animate-zoom-in-center',
        }}
      >
        <Image
          src={`https://assets.dulapahv.dev/images/${src}`}
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
