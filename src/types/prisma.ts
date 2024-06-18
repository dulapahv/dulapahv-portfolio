import {
  City,
  Country,
  Experience,
  Place,
  Project,
  Stack,
  Tag,
} from "@prisma/client";

export type ExperienceWithPlace = Experience & {
  place: Place & {
    city: City & {
      country: Country;
    };
  };
};

export type ProjectsWithPlace = Project & {
  place: Place & {
    city: City & {
      country: Country;
    };
  };
};

export type TagWithStacks = Tag & {
  stacks: Stack[];
};

export type CountriesWithCities = Country & {
  cities: City[];
};
