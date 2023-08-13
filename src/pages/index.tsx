import React from 'react';

import { useTranslation } from 'next-i18next';

import Link from 'next/link';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Index = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div>index</div>
    </div>
  );
};

export async function getStaticProps(context: any) {
  // extract the locale identifier from the URL
  const { locale } = context;

  return {
    props: {
      // pass the translation props to the page component
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default Index;
