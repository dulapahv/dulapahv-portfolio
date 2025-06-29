import type {
  BlogPosting,
  CreativeWork,
  EmployeeRole,
  Person,
  WebSite,
  WithContext,
} from 'schema-dts';

import { BASE_URL, DESCRIPTION, IS_DEV_ENV, NAME } from '@/lib/constants';
import { social } from '@/lib/social';

import { getAllSkillsForSchema } from './skills-data';

export const personSchema: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${BASE_URL}/#person`,
  name: NAME,
  givenName: 'Dulapah',
  familyName: 'Vibulsanti',
  alternateName: 'DulapahV',
  description: DESCRIPTION,
  gender: 'male',
  nationality: {
    '@type': 'Country',
    name: 'Thailand',
  },
  url: BASE_URL,
  image: {
    '@type': 'ImageObject',
    url: new URL('/avatar.jpg', BASE_URL).toString(),
    caption: 'Dulapah Vibulsanti - Software Engineer',
  },
  sameAs: [...Object.values(social).map(({ href }) => href)],
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'University of Glasgow',
      url: 'https://www.gla.ac.uk/',
      identifier: 'Russell Group University',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Glasgow',
        addressCountry: 'GB',
        postalCode: 'G12 8QQ',
        streetAddress: 'University Avenue',
      },
    },
    {
      '@type': 'CollegeOrUniversity',
      name: "King Mongkut's Institute of Technology Ladkrabang",
      alternateName: 'KMITL',
      url: 'https://www.kmitl.ac.th/',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bangkok',
        addressCountry: 'TH',
        postalCode: '10520',
        streetAddress: '1 Chalong Krung 1 Alley, Lat Krabang',
      },
    },
    {
      '@type': 'EducationalOrganization',
      name: 'Suankularb Wittayalai School',
      url: 'https://www.sk.ac.th/',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bangkok (Wang Burapha Pirom, Phra Nakhon District)',
        addressCountry: 'TH',
        postalCode: '10200',
        streetAddress: '88 Tri Phet Road',
      },
    },
  ],
  jobTitle: 'Software Engineer Graduate',
  worksFor: {
    '@type': 'Organization',
    name: 'NatWest Group',
    url: 'https://www.natwestgroup.com/',
    description:
      "One of the United Kingdom's Big Four banks, serving over 19 million customers",
  },
  workLocation: {
    '@type': 'Place',
    name: 'Edinburgh, Scotland',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Edinburgh',
      addressRegion: 'Scotland',
      addressCountry: 'GB',
    },
  },
  knowsAbout: getAllSkillsForSchema(),
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      '@id': `${BASE_URL}/#degree-glasgow`,
      name: 'BSc (Hons) Software Engineering - Double Degree',
      description:
        'Double degree program with KMITL. First Class Honours with Specialization in Parallel and Distributed Systems. Final two years completed at University of Glasgow.',
      credentialCategory: 'degree',
      educationalLevel: 'Bachelor',
      dateCreated: '2025-05',
      recognizedBy: {
        '@type': 'CollegeOrUniversity',
        name: 'University of Glasgow',
        url: 'https://www.gla.ac.uk/',
      },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      '@id': `${BASE_URL}/#degree-kmitl`,
      name: 'BEng Software Engineering - Double Degree',
      description:
        'Double degree program with University of Glasgow. First two years completed at KMITL before transferring to Glasgow.',
      credentialCategory: 'degree',
      educationalLevel: 'Bachelor',
      dateCreated: '2025-05',
      recognizedBy: {
        '@type': 'CollegeOrUniversity',
        name: "King Mongkut's Institute of Technology Ladkrabang",
        url: 'https://www.kmitl.ac.th/',
      },
    },
  ],
  knowsLanguage: [
    {
      '@type': 'Language',
      name: 'Thai',
      alternateName: 'th',
    },
    {
      '@type': 'Language',
      name: 'English',
      alternateName: 'en',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'professional',
    areaServed: 'GB',
    availableLanguage: ['en', 'th'],
    url: `${BASE_URL}/contact`,
  },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Software Engineer',
    description:
      'A Software Engineer is responsible for designing, developing, testing, and maintaining software applications and systems. They work with various programming languages and technologies to create efficient and scalable solutions.',
    occupationalCategory: '15-1252.00',
    occupationLocation: {
      '@type': 'City',
      name: 'Edinburgh, Scotland',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Edinburgh',
        addressRegion: 'Scotland',
        addressCountry: 'GB',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/#occupation-software-engineer`,
      lastReviewed: '2025-06-29',
    },
  },
};

export const websiteSchema: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: 'DulapahV Portfolio',
  description: DESCRIPTION,
  publisher: {
    '@id': `${BASE_URL}/#person`,
  },
  inLanguage: 'en-US',
};

export const createBlogPostingSchema = (post: {
  title: string;
  description: string;
  date: Date;
  slug: string;
  readingTime?: string;
  image?: string;
}): WithContext<BlogPosting> => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${BASE_URL}/blog/${post.slug}#article`,
  headline: post.title,
  description: post.description,
  datePublished: post.date.toISOString(),
  dateModified: post.date.toISOString(),
  author: {
    '@id': `${BASE_URL}/#person`,
  },
  publisher: {
    '@id': `${BASE_URL}/#person`,
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${BASE_URL}/blog/${post.slug}`,
  },
  ...(post.image && {
    image: {
      '@type': 'ImageObject',
      url: new URL(post.image, BASE_URL).toString(),
    },
  }),
  ...(post.readingTime && {
    timeRequired: post.readingTime,
  }),
  inLanguage: 'en-US',
  url: `${BASE_URL}/blog/${post.slug}`,
});

export const createProjectSchema = (project: {
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  slug: string;
  image?: string;
}): WithContext<CreativeWork> => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  '@id': `${BASE_URL}/project/${project.slug}#project`,
  name: project.title,
  description: project.description,
  creator: {
    '@id': `${BASE_URL}/#person`,
  },
  dateCreated: project.startDate.toISOString(),
  ...(project.endDate && {
    dateModified: project.endDate.toISOString(),
  }),
  ...(project.image && {
    image: {
      '@type': 'ImageObject',
      url: new URL(project.image, BASE_URL).toString(),
    },
  }),
  url: `${BASE_URL}/project/${project.slug}`,
  inLanguage: 'en-US',
});

export const createWorkSchema = (work: {
  position: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  slug: string;
}): WithContext<EmployeeRole> => ({
  '@context': 'https://schema.org',
  '@type': 'EmployeeRole',
  '@id': `${BASE_URL}/work/${work.slug}#role`,
  roleName: work.position,
  startDate: work.startDate.toISOString(),
  ...(work.endDate && {
    endDate: work.endDate.toISOString(),
  }),
});

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const combineSchemas = (schemas: Array<WithContext<any>>): string => {
  return JSON.stringify(
    schemas.length === 1 ? schemas[0] : schemas,
    null,
    IS_DEV_ENV ? 2 : 0,
  );
};
