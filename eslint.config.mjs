import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});
const eslintConfig = [
  {
    ignores: [
      'node_modules/*',
      '.next/*',
      'playwright-report/*',
      'src/components/ui/*',
      'tailwind.config.ts',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
  },
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
  }),
];
export default eslintConfig;
