import * as React from "react";
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
} from "@react-email/components";

import { ASSETS_URL, BASE_URL, LINKEDIN_URL } from "@/lib/constants";
import { EmailTemplateProps } from "@/types";

const EmailTemplate = ({
  fullName,
  email,
  type,
  message,
}: Readonly<EmailTemplateProps>) => (
  <Html>
    <Head />
    <Preview>
      New {type} message from {fullName}
    </Preview>
    <Tailwind>
      <Body className="mx-auto my-auto bg-white px-2 font-sans">
        <Container className="mx-auto my-10 max-w-xl rounded border border-solid border-[#eaeaea] p-5">
          <Section className="mt-4">
            <Img
              src={`${ASSETS_URL}/logo192.png`}
              width="48"
              height="48"
              alt="DulapahV's Portfolio Logo"
              className="mx-auto my-0"
            />
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-left text-base leading-6 text-default-800">
              Hi, someone contact you via DulapahV's Portfolio website. Here is
              the information.
            </Text>
            <Text className="text-sm/6 text-black">
              <strong>Full Name:</strong> {fullName}
              <br />
              <strong>Email:</strong> {email}
              <br />
              <strong>Type:</strong> {type}
              <br />
              <strong>Message:</strong>
              <br />
              {message}
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-sm/6 text-black">
              <Link className="text-blue-600 no-underline" href={BASE_URL}>
                DulapahV's Portfolio
              </Link>{" "}
              ・{" "}
              <Link className="text-blue-600 no-underline" href={LINKEDIN_URL}>
                LinkedIn
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default EmailTemplate;
