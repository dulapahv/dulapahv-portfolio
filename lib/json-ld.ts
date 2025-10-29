import type {
  BlogPosting,
  CollectionPage,
  ContactPage,
  CreativeWork,
  Organization,
  Person,
  ProfilePage,
  WebSite,
  WithContext
} from 'schema-dts';

import { BASE_URL, DESCRIPTION, IS_DEV_ENV, NAME } from '@/lib/constants';
import { getCollection } from '@/lib/content-utils';
import { social } from '@/lib/social';

import { getAllSkillsForSchema } from './skills-data';

// Helper to generate OG image URLs
const getOgImageUrl = (title: string, description?: string): string => {
  const params = new URLSearchParams({
    title,
    ...(description && { description })
  });
  return `${BASE_URL}/og?${params.toString()}`;
};

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
    name: 'Thailand'
  },
  url: BASE_URL,
  image: {
    '@type': 'ImageObject',
    url: getOgImageUrl('Dulapah Vibulsanti\nSoftware Engineer', DESCRIPTION),
    caption: 'Dulapah Vibulsanti - Software Engineer',
    width: '1200',
    height: '630'
  },
  sameAs: [...new Set(Object.values(social).map(({ href }) => href))],
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'University of Glasgow',
      url: 'https://www.gla.ac.uk/',
      identifier: 'Russell Group University',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Glasgow',
        addressRegion: 'Scotland',
        addressCountry: 'GB',
        postalCode: 'G12 8QQ',
        streetAddress: 'University Avenue'
      }
    },
    {
      '@type': 'CollegeOrUniversity',
      name: "King Mongkut's Institute of Technology Ladkrabang",
      alternateName: 'KMITL',
      url: 'https://www.kmitl.ac.th/',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bangkok',
        addressRegion: 'Bangkok',
        addressCountry: 'TH',
        postalCode: '10520',
        streetAddress: '1 Chalong Krung 1 Alley, Lat Krabang'
      }
    },
    {
      '@type': 'EducationalOrganization',
      name: 'Suankularb Wittayalai School',
      url: 'https://www.sk.ac.th/',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bangkok',
        addressRegion: 'Phra Nakhon',
        addressCountry: 'TH',
        postalCode: '10200',
        streetAddress: '88 Tri Phet Road'
      }
    }
  ],
  jobTitle: 'Graduate Software Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'NatWest Group',
    url: 'https://www.natwestgroup.com/',
    description: "One of the UK's Big Four banks, serving over 19 million customers",
    sameAs: 'https://en.wikipedia.org/wiki/NatWest_Group'
  },
  workLocation: {
    '@type': 'Place',
    name: 'Edinburgh, Scotland',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Edinburgh',
      addressRegion: 'Scotland',
      addressCountry: 'GB'
    }
  },
  knowsAbout: getAllSkillsForSchema(),
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      '@id': `${BASE_URL}/#degree-glasgow`,
      name: 'BSc (Hons) Software Engineering',
      description:
        'Double degree program with KMITL. First Class Honours with Specialization in Parallel and Distributed Systems. Final two years completed at University of Glasgow.',
      credentialCategory: 'degree',
      educationalLevel: 'Bachelor',
      dateCreated: '2023-09',
      recognizedBy: {
        '@type': 'CollegeOrUniversity',
        name: 'University of Glasgow',
        url: 'https://www.gla.ac.uk/'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      '@id': `${BASE_URL}/#degree-kmitl`,
      name: 'BEng Software Engineering',
      description:
        'Double degree programme with University of Glasgow. First two years completed at KMITL before transferring to Glasgow.',
      credentialCategory: 'degree',
      educationalLevel: 'Bachelor',
      dateCreated: '2021-08',
      recognizedBy: {
        '@type': 'CollegeOrUniversity',
        name: "King Mongkut's Institute of Technology Ladkrabang",
        url: 'https://www.kmitl.ac.th/'
      }
    }
  ],
  knowsLanguage: [
    {
      '@type': 'Language',
      name: 'Thai',
      alternateName: 'th'
    },
    {
      '@type': 'Language',
      name: 'English',
      alternateName: 'en'
    }
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'professional',
    areaServed: 'GB',
    availableLanguage: ['en', 'th'],
    url: `${BASE_URL}/contact`
  },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Software Engineer',
    description:
      'Software engineers design and create computer systems and applications to solve real-world problems.',
    occupationalCategory: '15-1252.00', // O*NET SOC Code
    occupationLocation: {
      '@type': 'City',
      name: 'Edinburgh, Scotland',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Edinburgh',
        addressRegion: 'Scotland',
        addressCountry: 'GB'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/#occupation-software-engineer`,
      name: 'Software Engineer',
      description:
        'Software engineers design and create computer systems and applications to solve real-world problems.',
      url: `${BASE_URL}/#occupation-software-engineer`,
      lastReviewed: new Date().toISOString()
    }
  }
};

export const websiteSchema: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: 'DulapahV Portfolio',
  alternateName: 'Dulapah Vibulsanti Portfolio',
  description: DESCRIPTION,
  publisher: {
    '@id': `${BASE_URL}/#person`
  },
  inLanguage: 'en-US'
};

export const profilePageSchema: WithContext<ProfilePage> = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': BASE_URL,
  url: BASE_URL,
  name: 'Dulapah Vibulsanti - Software Engineer',
  description: DESCRIPTION,
  dateCreated: new Date('2022-12-21').toISOString(),
  dateModified: new Date().toISOString(),
  mainEntity: {
    '@id': `${BASE_URL}/#person`
  },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: getOgImageUrl('Dulapah Vibulsanti\nSoftware Engineer', DESCRIPTION),
    width: '1200',
    height: '630'
  }
};

export const contactPageSchema: WithContext<ContactPage> = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${BASE_URL}/contact`,
  url: `${BASE_URL}/contact`,
  name: 'Contact DulapahV',
  description: "Let me know what's on your mind and I'll get back to you as soon as possible.",
  mainEntity: {
    '@id': `${BASE_URL}/#person`
  },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: getOgImageUrl(
      'Contact DulapahV',
      "Let me know what's on your mind and I'll get back to you as soon as possible."
    ),
    width: '1200',
    height: '630'
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    '@id': `${BASE_URL}/contact#breadcrumb`,
    name: 'Breadcrumbs',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Contact',
        item: `${BASE_URL}/contact`
      }
    ]
  }
};

export const collectionSchema = (
  type: string,
  config: {
    title: string;
    description: string;
  }
): WithContext<CollectionPage> => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${BASE_URL}/${type}`,
  url: `${BASE_URL}/${type}`,
  name: config.title,
  description: config.description,
  mainEntity: {
    '@type': 'ItemList',
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    numberOfItems: getCollection(type as any).length,
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    itemListElement: getCollection(type as any).map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${BASE_URL}/${type}/${item.slug}`
    }))
  },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: getOgImageUrl(config.title, config.description),
    width: '1200',
    height: '630'
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    '@id': `${BASE_URL}/${type}#breadcrumb`,
    name: 'Breadcrumbs',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: config.title,
        item: `${BASE_URL}/${type}`
      }
    ]
  }
});

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
  '@id': `${BASE_URL}/blog/${post.slug}`,
  url: `${BASE_URL}/blog/${post.slug}`,
  headline: post.title,
  description: post.description,
  datePublished: post.date.toISOString(),
  dateModified: post.date.toISOString(),
  author: {
    '@id': `${BASE_URL}/#person`
  },
  publisher: {
    '@id': `${BASE_URL}/#person`
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${BASE_URL}/blog/${post.slug}`
  },
  image: {
    '@type': 'ImageObject',
    url: getOgImageUrl(post.title, post.description),
    width: '1200',
    height: '630'
  },
  ...(post.readingTime && {
    timeRequired: `PT${post.readingTime.replace(' min read', 'M')}` // Convert to ISO 8601 duration
  }),
  inLanguage: 'en-US',
  articleSection: 'Blog',
  wordCount: post.readingTime ? parseInt(post.readingTime) * 200 : undefined // Rough estimate
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
  '@id': `${BASE_URL}/project/${project.slug}`,
  url: `${BASE_URL}/project/${project.slug}`,
  name: project.title,
  description: project.description,
  creator: {
    '@id': `${BASE_URL}/#person`
  },
  dateCreated: project.startDate.toISOString(),
  dateModified: (project.endDate || new Date()).toISOString(),
  image: {
    '@type': 'ImageObject',
    url: getOgImageUrl(project.title, project.description),
    width: '1200',
    height: '630'
  },
  inLanguage: 'en-US'
});

export const createWorkSchema = (work: {
  position: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  slug: string;
}): WithContext<Organization> => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/work/${work.slug}#org`,
  name: work.company,
  location: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: work.location
    }
  },
  employee: {
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`,
    jobTitle: work.position,
    worksFor: {
      '@type': 'Organization',
      name: work.company
    }
  },
  image: {
    '@type': 'ImageObject',
    url: getOgImageUrl(work.position, work.company),
    width: '1200',
    height: '630'
  }
});

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const combineSchemas = (schemas: Array<WithContext<any>>): string => {
  return JSON.stringify(schemas.length === 1 ? schemas[0] : schemas, null, IS_DEV_ENV ? 2 : 0);
};
