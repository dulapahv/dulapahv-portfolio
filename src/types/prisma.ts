import {
  Blog,
  City,
  Country,
  Education,
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

export type StackWithExperiencesProjectsBlogs = Stack & {
  experiences: ExperienceWithPlace[];
  projects: ProjectsWithPlace[];
  blogs: Blog[];
};

export type EducationWithPlace = Education & {
  place: Place & {
    city: City & {
      country: Country;
    };
  };
};
