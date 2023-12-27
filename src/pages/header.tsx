import React, { useRef, useState } from 'react';

import { useTheme } from 'next-themes';

import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';
import { TbMinusVertical } from 'react-icons/tb';
import { HiOutlineDocument } from 'react-icons/hi2';
import { BsArrowDownCircleFill } from 'react-icons/bs';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react';

const Header = () => {
  const captchaInstance = useRef<TurnstileInstance>(null);
  const { resolvedTheme } = useTheme();
  const [isRevealEmail, setIsRevealEmail] = useState(false);
  const [email, setEmail] = useState('' as string);
  const [isFetchingEmail, setIsFetchingEmail] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleCaptchaSuccess = async (token: string) => {
    onClose();
    setIsFetchingEmail(true);
    try {
      const response = await fetch(
        `https://verify.dulapahv.dev/validate-captcha?token=${token}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        setIsFetchingEmail(false);
        setEmail(result.message.email.label);
      } else {
        setIsFetchingEmail(false);
        setEmail(result.message);
      }
    } catch (error) {
      setIsFetchingEmail(false);
      setEmail('Cannot connect to server!');
    }
  };

  return (
    <div className="flex animate-fade-in flex-col overflow-hidden">
      <div className="relative w-screen *:absolute *:rounded-full *:opacity-70">
        <div className="left-[8%] top-[256px] size-4 animate-shake-vertical bg-RED"></div>
        <div className="left-[13%] top-[176px] size-8 animate-shake-vertical bg-BLUE animation-delay-400"></div>
        <div className="left-[36%] top-[128px] size-16 animate-shake-vertical bg-YELLOW animation-delay-800"></div>
        <div className="left-[68%] top-[128px] size-12 animate-shake-vertical bg-PURPLE animation-delay-1200"></div>
        <div className="left-[4%] top-[640px] size-8 animate-shake-vertical bg-YELLOW animation-delay-800"></div>
        <div className="-left-[1%] top-[704px] size-12 animate-shake-vertical bg-PURPLE animation-delay-1200"></div>
        <div className="left-[26%] top-[768px] size-12 animate-shake-vertical bg-RED"></div>
        <div className="left-[84%] top-[848px] size-8 animate-shake-vertical bg-YELLOW animation-delay-800"></div>
        <div className="left-[97%] top-[512px] size-16 animate-shake-vertical bg-BLUE animation-delay-400"></div>
      </div>
      <div className="flex h-fit min-h-screen flex-col items-center gap-8 overflow-hidden pt-4 md:pt-8 lg:flex-row lg:justify-around lg:gap-0 lg:pt-0">
        <div className="mx-4 flex w-fit flex-col gap-10 md:mx-8 lg:gap-20">
          <div className="animate-clip-in-left animation-delay-100">
            <h1 className="bg-BLUE p-3 pl-3 text-3xl font-bold uppercase tracking-[0.2em] text-WHITE [text-shadow:0_0_5px_#54f1ff] md:text-4xl lg:pl-6 lg:text-5xl">
              Dulapah Vibulsanti
            </h1>
            <h2 className="flex w-fit flex-wrap items-center bg-BLACK/50 px-3 text-sm text-WHITE md:text-base dark:bg-WHITE/50">
              NEXT.JS <TbMinusVertical /> TAILWIND CSS <TbMinusVertical />{' '}
              TYPESCRIPT <TbMinusVertical /> FIGMA <TbMinusVertical /> PYTHON{' '}
              <TbMinusVertical /> C/C++
            </h2>
            <div className="flex w-fit flex-wrap items-center bg-BLACK/10 px-3 text-sm text-BLACK md:text-base dark:bg-WHITE">
              <button className="btn btn-ghost h-[24px] min-h-0 select-text border-0 p-0 text-base/3 font-normal capitalize hover:bg-transparent">
                <a
                  href="https://www.linkedin.com/in/dulapahv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="-mb-1"
                >
                  LinkedIn
                  <FiExternalLink className="mb-1 ml-1 inline text-BLACK/80" />
                </a>
              </button>
              <span className="select-none">&nbsp;&nbsp;&nbsp;</span>
              <button className="btn btn-ghost h-[24px] min-h-0 select-text border-0 p-0 text-base/3 font-normal capitalize hover:bg-transparent">
                <a
                  href="https://github.com/dulapahv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="-mb-1"
                >
                  GitHub
                  <FiExternalLink className="mb-1 ml-1 inline text-BLACK/80" />
                </a>
              </button>
              <span className="select-none">&nbsp;&nbsp;&nbsp;</span>
              {email ? (
                <p className="text-BLACK">{email}</p>
              ) : (
                <>
                  {isFetchingEmail ? (
                    <span className="loading loading-bars loading-sm align-middle"></span>
                  ) : (
                    <button
                      className="btn btn-ghost h-[24px] min-h-0 p-0 text-base/3 font-normal capitalize underline hover:bg-transparent"
                      onClick={() => {
                        setIsRevealEmail(true);
                        onOpen();
                      }}
                    >
                      Reveal Email
                    </button>
                  )}
                </>
              )}
            </div>
            <h3 className="flex w-fit flex-wrap items-center bg-BLACK/10 px-3 text-sm text-BLACK md:text-base dark:bg-WHITE">
              <button className="btn btn-ghost h-[24px] min-h-0 select-text border-0 p-0 text-base/3 font-normal capitalize hover:bg-transparent">
                <a
                  href="https://gla-my.sharepoint.com/:b:/g/personal/2920990v_student_gla_ac_uk/EYjeFQclguxLgkkEvybx7twBQhjldsjUp0q0l5m1Kt4Sbg?e=tM6J8c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="-mb-1"
                >
                  View Resume
                  <HiOutlineDocument className="mb-1 ml-1 inline stroke-2 text-BLACK" />
                </a>
              </button>
            </h3>
          </div>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            hideCloseButton
            isDismissable={false}
            size="xs"
            placement="center"
            classNames={{
              wrapper: 'z-[2147483647] overflow-hidden',
              backdrop: 'z-[2147483647]',
            }}
          >
            <ModalContent>
              <ModalBody>
                {isRevealEmail && (
                  <div className="flex flex-col items-center gap-y-4">
                    <h1 className="text-center text-BLACK dark:text-WHITE">
                      <span className="loading loading-bars loading-sm mr-2 align-middle"></span>
                      Verifying...
                    </h1>
                    <Turnstile
                      siteKey="0x4AAAAAAACYFWWcTzhCNWz4" // 0x4AAAAAAACYFWWcTzhCNWz4 1x00000000000000000000AA
                      onError={() => {
                        // TODO: Reset captcha
                        console.log('Error!');
                      }}
                      onExpire={() => {
                        console.log('Expired!');
                        // TODO: Reset captcha
                        // captchaInstance.current?.reset();
                      }}
                      onSuccess={handleCaptchaSuccess}
                      options={{
                        theme: resolvedTheme === 'dark' ? 'dark' : 'light',
                      }}
                      ref={captchaInstance}
                    />
                  </div>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
          <div className="flex flex-col gap-4 *:w-fit *:-rotate-6 *:items-center *:px-3 *:py-1 *:text-sm *:font-medium *:uppercase *:text-WHITE sm:*:text-base md:*:text-lg">
            <h3 className="animate-clip-in-left bg-RED animation-delay-100 [text-shadow:0_0_5px_#c3456d]">
              Software Engineer
            </h3>
            <h3 className="animate-clip-in-left bg-YELLOW animation-delay-200 [text-shadow:0_0_5px_#917833]">
              Frontend Developer
            </h3>
            <h3 className="animate-clip-in-left bg-PURPLE animation-delay-300 [text-shadow:0_0_5px_#7948c7]">
              Pursuing Fullstack Developer
            </h3>
          </div>
        </div>
        <div className="relative mt-4 lg:mt-0">
          <div className="absolute -bottom-16 left-32 h-36 w-screen animate-clip-in-right bg-BLUE opacity-50"></div>
          <div className="mx-8 flex w-64 min-[375px]:w-72 min-[425px]:w-80 sm:w-96 md:w-[26rem] lg:w-auto">
            <div className="z-[1] w-fit animate-clip-in-left animation-delay-300">
              <Image
                src="/images/profile_pic.jpg"
                width={500}
                height={500}
                alt="profile_pic"
                className="rounded-bl-3xl"
              />
            </div>
            <div className="absolute aspect-square h-full animate-clip-in-left rounded-bl-3xl bg-BLUE shadow"></div>
          </div>
        </div>
      </div>
      <div className="relative bottom-32 z-[1] flex flex-col items-center gap-1 text-center text-2xl text-RED">
        <div className="flex animate-bounce flex-col items-center">
          <BsArrowDownCircleFill
            className="btn btn-circle btn-sm z-[1] cursor-pointer text-RED drop-shadow-md"
            onClick={() => {
              const education = document.getElementById('aboutme');
              education?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <button
            className="btn btn-circle btn-sm pointer-events-none absolute z-0 animate-ping drop-shadow-md"
            aria-label="Scroll to see more"
          ></button>
        </div>
        <p className="text-xs">Scroll to see more</p>
      </div>
    </div>
  );
};

export default Header;
