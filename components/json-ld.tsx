import type { Person, WithContext } from 'schema-dts';

import { BASE_URL, NAME } from '@/lib/constants';
import { social } from '@/lib/social';

const person: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: NAME,
  description: 'Software Engineer',
  gender: 'male',
  nationality: 'Thailand',
  url: BASE_URL,
  image: new URL('/avatar.jpg', BASE_URL).toString(),
  sameAs: Object.values(social).map(({ href }) => href),
  alumniOf: [
    'University of Glasgow',
    "King Mongkut's University of Technology Ladkrabang",
    'Suankularb Wittayalai School',
  ],
};

export const JsonLd = () => (
  <script type="application/ld+json">{JSON.stringify(person)}</script>
);
