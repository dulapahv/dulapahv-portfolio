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
  Text
} from '@react-email/components';
import { encode } from 'html-entities';

import { ASSETS_URL, BASE_URL, GITHUB_URL, LINKEDIN_URL, NAME } from '@/lib/constants';

export interface ConfirmationEmailTemplateProps {
  readonly name: string;
  readonly message: string;
}

export function ConfirmationEmailTemplate({
  name: fullName,
  message
}: ConfirmationEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Confirmation of your message to {NAME}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-10 max-w-xl rounded border border-solid border-neutral-200 p-5">
            <Section className="mt-4">
              <Img
                src={`${ASSETS_URL}/logo512.png`}
                width="48"
                height="48"
                alt="DulapahV Portfolio Logo"
              />
              <Hr className="mx-0 my-[26px] w-full border border-solid border-neutral-200" />
              <Text className="text-default-800 text-left text-base leading-6">
                <strong>Hi {fullName},</strong>
                <br />
                Thank you for reaching out to me! I have received your message and will get back to
                you as soon as possible.
              </Text>
              <Text className="text-sm/6 text-black">
                <strong>Your message:</strong>
                <br />
                <span
                  dangerouslySetInnerHTML={{
                    __html: encode(message).replace(/\n/g, '<br />')
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
                <Link href={LINKEDIN_URL} className="text-[#fb568a] no-underline">
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
