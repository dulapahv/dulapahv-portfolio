import { GetServerSideProps } from 'next';
import { getServerSideSitemapLegacy, ISitemapField } from 'next-sitemap';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields: ISitemapField[] = [
    {
      loc: 'https://dulapahv.dev',
      lastmod: new Date().toISOString(),
    },
    {
      loc: 'https://dulapahv.dev/gistda',
      lastmod: new Date().toISOString(),
    },
    {
      loc: 'https://dulapahv.dev/notion',
      lastmod: new Date().toISOString(),
    },
    {
      loc: 'https://dulapahv.dev/#about',
      lastmod: new Date().toISOString(),
    },
    {
      loc: 'https://dulapahv.dev/#education',
      lastmod: new Date().toISOString(),
    },
    {
      loc: 'https://dulapahv.dev/#experience',
      lastmod: new Date().toISOString(),
    },
    {
      loc: 'https://dulapahv.dev/#skill',
      lastmod: new Date().toISOString(),
    },
    {
      loc: 'https://dulapahv.dev/#project',
      lastmod: new Date().toISOString(),
    },
  ];

  return getServerSideSitemapLegacy(ctx, fields);
};

export default function ServerSitemap() {}
