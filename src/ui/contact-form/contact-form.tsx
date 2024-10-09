"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { ChevronsUpDown, Send } from "lucide-react";
import { isMobile } from "react-device-detect";
import { useForm } from "react-hook-form";
import { type ErrorResponse } from "resend";
import { toast } from "sonner";

import { useOnLeavePageConfirmation } from "@/hooks/use-on-leave-page-confirmation";
import {
  CAPTCHA_URL,
  contactTypeOptions,
  EMAIL_MAX_LENGTH,
  MESSAGE_MAX_LENGTH,
  NAME_MAX_LENGTH,
} from "@/lib/constants";
import { EmailTemplateProps } from "@/types/types";
import { Captcha } from "@/ui/captcha";

import { schema } from "./validator";

interface ContactFormProps {
  name: string;
  email: string;
  type: string;
  message: string;
}

export function ContactForm({
  name: _name,
  email: _email,
  type: _type,
  message: _message,
}: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    watch,
    reset,
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: _name,
      email: _email,
      type: _type,
      message: _message,
    },
  });

  useOnLeavePageConfirmation(isDirty);

  async function onSubmitHandler(data: EmailTemplateProps) {
    const formData = new FormData();
    formData.append("cf-turnstile-response", data.captcha);

    try {
      // Captcha verification
      const captchaResponse = await fetch(CAPTCHA_URL, {
        method: "POST",
        body: formData,
      });

      if (!captchaResponse.ok) {
        toast.error(
          `An error occurred while contacting the captcha verification server. Status: ${captchaResponse.status}`,
        );
        return;
      }

      const result = await captchaResponse.json();

      if (!result.success) {
        toast.error(
          `An error occurred while verifying captcha.\nError codes: ${result["error-codes"]?.join(", ")}`,
        );
        return;
      }

      const type = contactTypeOptions.find(
        (option) => option.key === data.type,
      )?.label;

      // Sending the message
      try {
        const sendResponse = await fetch(
          `api/send?name=${data.name.trim()}&email=${data.email.trim()}&type=${type}&message=${data.message.trim()}`,
          {
            method: "POST",
          },
        );

        if (!sendResponse.ok) {
          const error = JSON.parse(await sendResponse.text())
            .error as ErrorResponse;
          toast.error(
            `An error occurred while sending your message.\nStatus: ${sendResponse.status}\nReason: ${error.name} - ${error.message}`,
          );
          return;
        }

        toast.success(
          "Your message has been sent successfully!\nI'll get back to you as soon as possible.",
        );
        reset();
      } catch (sendError) {
        toast.error(
          `An error occurred while sending your message. ${sendError}`,
        );
      }
    } catch (captchaError) {
      toast.error(
        `An error occurred during captcha verification. ${captchaError}`,
      );
    }
  }

  function onSubmitErrorHandler() {
    toast.error("Please check the form for errors.");
    return;
  }

  function onVerifyCaptcha(token: string) {
    setValue("captcha", token);
    clearErrors("captcha");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler, onSubmitErrorHandler)}
      className="flex flex-col gap-y-4"
    >
      <Input
        {...register("name")}
        label={
          <>
            <p className="after:ml-0.5 after:text-danger after:content-['*']">
              Full Name
            </p>
            <p className="text-xs text-default-500">
              {watch("name")?.length || 0}/{NAME_MAX_LENGTH}
            </p>
          </>
        }
        isInvalid={!!errors.name}
        color={errors.name ? "danger" : "default"}
        errorMessage={errors.name?.message}
        placeholder="Dulapah Vibulsanti"
        radius="sm"
        labelPlacement="outside"
        isClearable={isMobile}
        classNames={{
          label: "w-full pr-0 flex justify-between items-end",
        }}
      />
      <Input
        {...register("email")}
        label={
          <>
            <p className="after:ml-0.5 after:text-danger after:content-['*']">
              Email
            </p>
            <p className="text-xs text-default-500">
              {watch("email")?.length || 0}/{EMAIL_MAX_LENGTH}
            </p>
          </>
        }
        type="email"
        isInvalid={!!errors.email}
        color={errors.email ? "danger" : "default"}
        errorMessage={errors.email?.message}
        placeholder="dulapah@example.com"
        radius="sm"
        labelPlacement="outside"
        isClearable={isMobile}
        classNames={{
          label: "w-full pr-0 flex justify-between items-end",
        }}
      />
      <Select
        {...register("type")}
        label="Type"
        defaultSelectedKeys={_type ? [_type] : [contactTypeOptions[0].key]}
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
              "rounded-lg px-1 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-lg [-webkit-backdrop-filter:blur(16px)] backdrop-filter border border-default-50",
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
        {...register("message")}
        label={
          <>
            <p className="after:ml-0.5 after:text-danger after:content-['*']">
              Message
            </p>
            <p className="text-xs text-default-500">
              {watch("message")?.length || 0}/{MESSAGE_MAX_LENGTH}
            </p>
          </>
        }
        isInvalid={!!errors.message}
        color={errors.message ? "danger" : "default"}
        errorMessage={errors.message?.message}
        placeholder="Hello, I would like to..."
        radius="sm"
        labelPlacement="outside"
        maxRows={20}
        classNames={{
          label: "w-full pr-0 flex justify-between items-end",
          input: "min-h-[80px]",
        }}
      />
      <div>
        <Captcha onVerifyCaptcha={onVerifyCaptcha} />
        {errors.captcha && (
          <p className="text-xs text-danger">Please complete the captcha</p>
        )}
      </div>
      <p className="text-sm text-default-500">
        Your email will not be shared with anyone.
      </p>
      <Button
        type="submit"
        color="primary"
        radius="sm"
        startContent={
          !isSubmitting && <Send size={20} className="flex-shrink-0" />
        }
        className="w-fit"
        isLoading={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
