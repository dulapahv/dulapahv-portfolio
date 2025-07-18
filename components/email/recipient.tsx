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

import {
  ASSETS_URL,
  BASE_URL,
  GITHUB_URL,
  LINKEDIN_URL,
} from '@/lib/constants';

export interface RecipientEmailTemplateProps {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

export function RecipientEmailTemplate({
  name: fullName,
  email,
  message,
}: RecipientEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>New message from {fullName}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-10 max-w-xl rounded border border-solid border-neutral-200 p-5">
            <Section className="mt-4">
              <Img
                src={`${ASSETS_URL}/logo192.png`}
                width="48"
                height="48"
                alt="DulapahV Portfolio Logo"
              />
              <Hr className="mx-0 my-[26px] w-full border border-solid border-neutral-200" />
              <Text className="text-default-800 text-left text-base leading-6">
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
                <strong>Message:</strong>
                <br />
                <span
                  dangerouslySetInnerHTML={{
                    __html: message.replace(/\n/g, '<br />'),
                  }}
                />
              </Text>
              <Hr className="mx-0 my-[26px] w-full border border-solid border-neutral-200" />
              <Text className="text-sm/6 text-black">
                <Link href={BASE_URL} className="text-[#fb568a] no-underline">
                  DulapahV Portfolio
                </Link>{' '}
                ・{' '}
                <Link href={GITHUB_URL} className="text-[#fb568a] no-underline">
                  GitHub
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
