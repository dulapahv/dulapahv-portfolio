import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import type { EmailTemplateProps } from '@/types/types';
import { ASSETS_URL, BASE_URL, LINKEDIN_URL } from '@/lib/constants';

export function EmailTemplate({
  name: fullName,
  email,
  type,
  message,
}: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>
        New {type} message from {fullName}
      </Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-10 max-w-xl rounded border border-solid border-neutral-200 p-5">
            <Section className="mt-4">
              <Img
                src={`${ASSETS_URL}/logo192.png`}
                width="48"
                height="48"
                alt="DulapahV's Portfolio Logo"
              />
              <Hr className="mx-0 my-[26px] w-full border border-solid border-neutral-200" />
              <Text className="text-left text-base leading-6 text-default-800">
                <strong>Hi DulapahV,</strong>
                <br />
                You have a new message from the contact form on your portfolio
                website.
                <br />
                Please see the details below:
              </Text>
              <Text className="text-sm/6 text-black">
                <strong>Full Name:</strong> {fullName}
                <br />
                <strong>Email:</strong>{' '}
                <Link
                  href={`mailto:${email}`}
                  className="text-[#fb568a] no-underline"
                >
                  {email}
                </Link>
                <br />
                <strong>Type:</strong> {type}
                <br />
                <strong>Message:</strong>
                <br />
                {message}
              </Text>
              <Hr className="mx-0 my-[26px] w-full border border-solid border-neutral-200" />
              <Text className="text-sm/6 text-black">
                <Link href={BASE_URL} className="text-[#fb568a] no-underline">
                  DulapahV's Portfolio
                </Link>{' '}
                ・{' '}
                <Link
                  href={LINKEDIN_URL}
                  className="text-[#fb568a] no-underline"
                >
                  LinkedIn
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
