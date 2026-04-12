import { Link } from "@/components/link";
import { LINKEDIN_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Card } from "./card";
import { CardHeader, CardHeaderIconLink } from "./card-header";

interface WorkExperience {
  position: string;
  company: string;
  location: string;
  formattedStartDate: string;
  formattedEndDate: string;
  isPresent?: boolean;
}

const works: WorkExperience[] = [
  {
    position: "Graduate Software Engineer",
    company: "NatWest Group",
    location: "Edinburgh, United Kingdom",
    formattedStartDate: "Sep 2025",
    formattedEndDate: "Present",
    isPresent: true,
  },
  {
    position: "Software Engineer Intern",
    company: "NatWest Group",
    location: "Edinburgh, United Kingdom",
    formattedStartDate: "Jun 2024",
    formattedEndDate: "Aug 2024",
  },
  {
    position: "Front-End Developer",
    company: "King Mongkut's Institute of Technology Ladkrabang (KMITL)",
    location: "Bangkok, Thailand",
    formattedStartDate: "Feb 2023",
    formattedEndDate: "Jul 2024",
  },
  {
    position: "Full-Stack Developer Intern",
    company: "Geo-Informatics and Space Technology Development Agency (GISTDA)",
    location: "Bangkok, Thailand",
    formattedStartDate: "Jun 2023",
    formattedEndDate: "Aug 2023",
  },
];

export function WorkCard() {
  return (
    <Card className="p-5">
      <CardHeader
        action={
          <CardHeaderIconLink
            href={LINKEDIN_URL}
            title="View my LinkedIn profile"
          />
        }
        title="Work"
      />
      <div className="relative flex h-full flex-col">
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 h-full w-px opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, var(--color-foreground) 0, var(--color-foreground) 4px, transparent 4px, transparent 8px)",
            maskImage:
              "linear-gradient(to bottom, black 75%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 75%, transparent 100%)",
          }}
        />

        <ul className="flex h-full flex-1 flex-col text-sm">
          {works.map((work, index) => (
            <li
              className="relative flex flex-col gap-1 pb-3 pl-4 first:pb-3"
              key={`work-${work.company}-${work.formattedStartDate}`}
            >
              <div
                aria-hidden="true"
                className="absolute top-2.5 left-0 h-px w-3 border-foreground/20 border-t border-dashed"
              />
              <p
                className={cn(
                  "flex items-center gap-2 font-medium text-foreground"
                )}
              >
                {index === 0 && work.isPresent ? (
                  <span className="relative inline-flex size-1.5 shrink-0">
                    <span
                      aria-hidden="true"
                      className="absolute size-1.5 animate-ping rounded-full bg-mirai-red"
                    />
                    <span
                      aria-hidden="true"
                      className="relative size-1.5 rounded-full bg-mirai-red"
                    />
                  </span>
                ) : null}
                {work.position} at {work.company}
              </p>
              <p className="text-foreground-muted">{work.location}</p>
              <time className="text-foreground-muted text-xs">
                {work.formattedStartDate}—{work.formattedEndDate}
              </time>
            </li>
          ))}
          <li className="mt-auto flex items-center justify-between pl-4">
            <Link
              className={cn("text-foreground-muted", "hover:text-foreground")}
              href={LINKEDIN_URL}
            >
              View full work experience
            </Link>
            <span className="ml-2 text-foreground-muted">2020-2023</span>
          </li>
        </ul>
      </div>
    </Card>
  );
}
