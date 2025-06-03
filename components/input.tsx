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
}: InputProps) => {
  const fieldId = `field-${name}`;
  const errorId = `error-${name}`;
  const successId = `success-${name}`;

  return (
    <Form.Field className="grid gap-1" name={name}>
      <div className="flex items-baseline justify-between">
        <Form.Label
          className="text-foreground-muted inline-block text-sm font-medium"
          htmlFor={fieldId}
        >
          {label && (
            <span
              className={
                required
                  ? 'after:text-error after:ml-0.5 after:content-["*"]'
                  : ''
              }
            >
              {label}
              {required && <span className="sr-only"> (required)</span>}
            </span>
          )}
        </Form.Label>

        <Form.Message
          className="text-error text-sm"
          match="badInput"
          id={`${errorId}-badInput`}
        >
          Please enter a valid {name}.
        </Form.Message>
        <Form.Message
          className="text-error text-sm"
          match="patternMismatch"
          id={`${errorId}-pattern`}
        >
          Please enter a valid {name}.
        </Form.Message>
        <Form.Message
          className="text-error text-sm"
          match="rangeOverflow"
          id={`${errorId}-overflow`}
        >
          The {name} is high.
        </Form.Message>
        <Form.Message
          className="text-error text-sm"
          match="rangeUnderflow"
          id={`${errorId}-underflow`}
        >
          The {name} is low.
        </Form.Message>
        <Form.Message
          className="text-error text-sm"
          match="stepMismatch"
          id={`${errorId}-step`}
        >
          The {name} must be a multiple of {props.step}.
        </Form.Message>
        <Form.Message
          className="text-error text-sm"
          match="tooLong"
          id={`${errorId}-long`}
        >
          The {name} must be less than {props.maxLength} characters.
        </Form.Message>
        <Form.Message
          className="text-error text-sm"
          match="tooShort"
          id={`${errorId}-short`}
        >
          The {name} must be at least {props.minLength} characters.
        </Form.Message>
        <Form.Message
          className="text-success text-sm"
          match="valid"
          id={successId}
        >
          Looks good!
        </Form.Message>
        <Form.Message
          className="text-error text-sm"
          match="valueMissing"
          id={`${errorId}-missing`}
        >
          Please enter your {name}.
        </Form.Message>
      </div>

      <Form.Control asChild>
        <input
          id={fieldId}
          name={name}
          className={cn(
            `bg-background-subtle border-border text-foreground w-full rounded-md border px-3
            py-2 text-sm outline-none`,
            'placeholder:text-foreground-subtle',
            className,
          )}
          required={required}
          aria-required={required}
          aria-invalid="false"
          aria-describedby={`${errorId} ${successId}`}
          {...props}
        />
      </Form.Control>
    </Form.Field>
  );
};
