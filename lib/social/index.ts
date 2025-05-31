import { GITHUB_URL, LINKEDIN_URL } from '@/lib/constants';

import GitHub from './github.svg';
import LinkedIn from './linkedin.svg';

export const social = {
  github: {
    label: 'GitHub',
    href: GITHUB_URL,
    icon: GitHub,
    follow: true,
    invert: true,
  },
  linkedin: {
    label: 'LinkedIn',
    href: LINKEDIN_URL,
    icon: LinkedIn,
    follow: true,
    invert: false,
  },
};
