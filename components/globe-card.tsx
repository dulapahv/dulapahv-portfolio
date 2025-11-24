import { EDUCATION_LOCATION, TRAVEL_LOCATIONS, WORK_LOCATION } from '@/lib/constants';
import { Card } from '@/components/card';
import { Globe } from '@/components/globe';

export function GlobeCard() {
  return (
    <Card className="p-5">
      <h2 className="text-foreground-muted mb-4 text-xs font-semibold tracking-widest uppercase">
        Places I&apos;ve Been To
      </h2>
      <div className="-mt-4 flex items-center justify-center">
        <Globe
          width={384}
          height={320}
          markers={[...EDUCATION_LOCATION, ...WORK_LOCATION, ...TRAVEL_LOCATIONS]}
          className="h-80 w-full cursor-grab overflow-hidden rounded-lg"
        />
      </div>
    </Card>
  );
}
