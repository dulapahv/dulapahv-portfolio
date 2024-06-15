import type {
  City,
  Country,
  Experience,
  Place,
  Project,
  Stack,
  Tag,
} from "@prisma/client";

export interface ExperienceWithPlace extends Experience {
  place: Place & {
    city: City & {
      country: Country;
    };
  };
}

export interface ProjectsWithPlace extends Project {
  place: Place & {
    city: City & {
      country: Country;
    };
  };
}

export interface TagWithStacks extends Tag {
  stacks: Stack[];
}

export interface CountriesWithCities extends Country {
  cities: City[];
}

export interface EmailTemplateProps {
  fullName: string;
  email: string;
  type: string;
  message: string;
}
