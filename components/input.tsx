import type { InputHTMLAttributes } from 'react';

import { Form } from 'radix-ui';

import { cn } from '@/lib/utils';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
};

export const Input = ({
  label,
  name,
  className,
  required,
  ...props
}: InputProps) => (
  <Form.Field className="grid gap-1" name={name}>
    <div className="flex items-baseline justify-between">
      <Form.Label className="text-foreground-muted inline-block text-sm font-medium">
        {label && (
          <span
            className={
              required
                ? 'after:text-error after:ml-0.5 after:content-["*"]'
                : ''
            }
          >
            {label}
          </span>
        )}
      </Form.Label>

      <Form.Message className="text-error text-sm" match="badInput">
        Please enter a valid {name}.
      </Form.Message>
      <Form.Message className="text-error text-sm" match="patternMismatch">
        Please enter a valid {name}.
      </Form.Message>
      <Form.Message className="text-error text-sm" match="rangeOverflow">
        The {name} is high.
      </Form.Message>
      <Form.Message className="text-error text-sm" match="rangeUnderflow">
        The {name} is low.
      </Form.Message>
      <Form.Message className="text-error text-sm" match="stepMismatch">
        The {name} must be a multiple of {props.step}.
      </Form.Message>
      <Form.Message className="text-error text-sm" match="tooLong">
        The {name} must be less than {props.maxLength} characters.
      </Form.Message>
      <Form.Message className="text-error text-sm" match="tooShort">
        The {name} must be at least {props.minLength} characters.
      </Form.Message>
      <Form.Message className="text-error text-sm" match="tooLong">
        The {name} must be less than {props.maxLength} characters.
      </Form.Message>
      <Form.Message className="text-error text-sm" match="tooShort">
        The {name} must be at least {props.minLength} characters.
      </Form.Message>
      <Form.Message className="text-success text-sm" match="valid">
        Looks good!
      </Form.Message>
      <Form.Message className="text-error text-sm" match="valueMissing">
        Please enter your {name}.
      </Form.Message>
    </div>

    <Form.Control asChild>
      <input
        className={cn(
          `bg-background-subtle border-border text-foreground w-full rounded-md border px-3
          py-2 outline-none`,
          'placeholder:text-foreground-subtle',
          'sm:text-sm',
          className,
        )}
        required={required}
        {...props}
      />
    </Form.Control>
  </Form.Field>
);
