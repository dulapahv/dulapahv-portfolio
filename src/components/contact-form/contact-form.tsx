"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Button,
  Input,
  Select,
  Selection,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { ChevronsUpDown, Send } from "lucide-react";
import { isMobile } from "react-device-detect";
import { ErrorResponse } from "resend";
import { toast } from "sonner";

import { Captcha } from "@/components";
import { contactTypeOptions } from "@/lib/constants";

interface ContactFormProps {
  name: string;
  email: string;
  type: string;
  message: string;
}

const NAME_MAX_LENGTH = 180;
const EMAIL_MAX_LENGTH = 180;
const MESSAGE_MAX_LENGTH = 1000;

export default function ContactForm({
  name: _name,
  email: _email,
  type: _type,
  message: _message,
}: ContactFormProps) {
  const [name, setName] = useState(_name);
  const [email, setEmail] = useState(_email);
  const [type, setType] = useState<Selection>(new Set([_type]));
  const [message, setMessage] = useState(_message);

  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isMessageInvalid, setIsMessageInvalid] = useState(false);

  const [isCaptchaSuccess, setIsCaptchaSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const isEmailCorrect = useMemo(() => {
    if (!email) return false;

    return email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)
      ? false
      : true;
  }, [email]);

  const handleSend = useCallback(async () => {
    if (!name) setIsNameInvalid(true);
    if (!email) setIsEmailInvalid(true);
    if (!message) setIsMessageInvalid(true);

    if (!name || !email || !message) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!isCaptchaSuccess) {
      toast.error("Please complete the captcha");
      return;
    }

    setIsLoading(true);

    const typeLabel: string =
      contactTypeOptions.find((item) => item.key === Array.from(type)[0])
        ?.label || contactTypeOptions[0].label;

    const response = await fetch(
      `api/send?name=${name}&email=${email}&type=${typeLabel}&message=${message}`,
      {
        method: "POST",
      },
    );

    if (!response.ok) {
      const error = JSON.parse(await response.text()).error as ErrorResponse;
      toast.error(
        `An error occurred while sending your message.\nStatus: ${response.status}\nReason: ${error.name} - ${error.message}`,
      );
      setIsLoading(false);
      return;
    }

    toast.success(
      "Your message has been sent successfully!\nI'll get back to you as soon as possible.",
    );
    setIsLoading(false);
  }, [name, email, type, message, isCaptchaSuccess]);

  const handleNameChange = useCallback((value: string) => {
    if (value.length <= NAME_MAX_LENGTH) {
      setName(value);
      setIsNameInvalid(false);
    }
  }, []);

  const handleEmailChange = useCallback((value: string) => {
    if (value.length <= EMAIL_MAX_LENGTH) {
      setEmail(value);
      setIsEmailInvalid(false);
    }
  }, []);

  const handleMessageChange = useCallback((value: string) => {
    if (value.length <= MESSAGE_MAX_LENGTH) {
      setMessage(value);
      setIsMessageInvalid(false);
    }
  }, []);

  return (
    <div className="flex flex-col gap-y-4">
      <Input
        label={
          <>
            <p className="after:ml-0.5 after:text-danger after:content-['*']">
              Full Name
            </p>
            <p className="text-xs text-default-500">
              {name.length}/{NAME_MAX_LENGTH}
            </p>
          </>
        }
        value={name}
        onValueChange={handleNameChange}
        isInvalid={isNameInvalid}
        color={isNameInvalid ? "danger" : "default"}
        errorMessage="Please enter your full name"
        placeholder="Dulapah Vibulsanti"
        radius="sm"
        labelPlacement="outside"
        isClearable={isMobile}
        classNames={{
          label: "w-full pr-0 flex justify-between items-end",
        }}
      />
      <Input
        label={
          <>
            <p className="after:ml-0.5 after:text-danger after:content-['*']">
              Email
            </p>
            <p className="text-xs text-default-500">
              {email.length}/{EMAIL_MAX_LENGTH}
            </p>
          </>
        }
        type="email"
        value={email}
        onValueChange={handleEmailChange}
        isInvalid={isEmailCorrect || isEmailInvalid}
        color={isEmailCorrect ? "danger" : "default"}
        errorMessage="Please enter a valid email"
        placeholder="dulapah@example.com"
        radius="sm"
        labelPlacement="outside"
        isClearable={isMobile}
        classNames={{
          label: "w-full pr-0 flex justify-between items-end",
        }}
      />
      <Select
        label="Type"
        selectedKeys={type}
        onSelectionChange={setType}
        items={contactTypeOptions}
        disallowEmptySelection
        labelPlacement="outside"
        radius="sm"
        disableSelectorIconRotation
        isRequired
        selectorIcon={<ChevronsUpDown size={20} className="text-default-400" />}
        classNames={{
          base: `items-center`,
          value: "text-default-800",
        }}
        popoverProps={{
          classNames: {
            content:
              "rounded-lg px-1 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-lg [-webkit-backdrop-filter:blur(16px)] backdrop-filter border-1 border-default-50",
          },
        }}
        listboxProps={{
          itemClasses: {
            base: "rounded-md dark:data-[hover=true]:bg-zinc-800/50 data-[hover=true]:bg-zinc-200/50 dark:focus:!bg-zinc-800/50 focus:!bg-zinc-200/50",
            selectedIcon: "text-primary",
          },
        }}
      >
        {(item) => (
          <SelectItem
            key={item.key}
            textValue={item.label}
            classNames={{
              base: "[&>span]:space-x-2",
            }}
          >
            <span>{item.label}</span>
            <span className="text-default-500">{item.description}</span>
          </SelectItem>
        )}
      </Select>
      <Textarea
        label={
          <>
            <p className="after:ml-0.5 after:text-danger after:content-['*']">
              Message
            </p>
            <p className="text-xs text-default-500">
              {message.length}/{MESSAGE_MAX_LENGTH}
            </p>
          </>
        }
        value={message}
        onValueChange={handleMessageChange}
        isInvalid={isMessageInvalid}
        color={isMessageInvalid ? "danger" : "default"}
        errorMessage="Please enter your message"
        placeholder="Hello, I would like to..."
        radius="sm"
        labelPlacement="outside"
        disableAutosize
        disableAnimation
        classNames={{
          label: "w-full pr-0 flex justify-between items-end",
          input: "resize-y min-h-[80px]",
        }}
      />
      <Captcha isSuccess={setIsCaptchaSuccess} />
      <p className="text-sm text-default-500">
        Your email will not be shared with anyone.
      </p>
      <Button
        onPress={handleSend}
        color="primary"
        radius="sm"
        startContent={
          !isLoading && <Send size={20} className="flex-shrink-0" />
        }
        className="w-fit"
        isLoading={isLoading}
      >
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </div>
  );
}
