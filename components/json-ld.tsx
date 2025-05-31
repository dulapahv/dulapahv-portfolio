import type { Person, WithContext } from 'schema-dts';

import { BASE_URL } from '@/lib/constants';
import { social } from '@/lib/social';

const person: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dulapah Vibulsanti',
  description: 'Software Engineer',
  gender: 'male',
  nationality: 'Thailand',
  url: BASE_URL,
  image: new URL('/avatar.jpg', BASE_URL).toString(),
  sameAs: Object.values(social).map(({ href }) => href),
  alumniOf: 'University of Glasgow',
};

export const JsonLd = () => (
  <script type="application/ld+json">{JSON.stringify(person)}</script>
);
