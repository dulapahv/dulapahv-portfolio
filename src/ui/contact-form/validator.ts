import * as yup from 'yup';

import {
  contactTypeOptions,
  EMAIL_MAX_LENGTH,
  MESSAGE_MAX_LENGTH,
  NAME_MAX_LENGTH,
} from '@/lib/constants';

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Full name is required')
    .max(
      NAME_MAX_LENGTH,
      `Full name must be less than ${NAME_MAX_LENGTH} characters`,
    ),
  email: yup
    .string()
    .required('Email address is required')
    .max(
      EMAIL_MAX_LENGTH,
      `Email address must be less than ${EMAIL_MAX_LENGTH} characters`,
    )
    .email('Email address is invalid'),
  type: yup
    .string()
    .required('Type is required')
    .oneOf(
      contactTypeOptions.map((option) => option.key),
      'Type is invalid',
    ),
  message: yup
    .string()
    .required('Message is required')
    .max(
      MESSAGE_MAX_LENGTH,
      `Message must be less than ${MESSAGE_MAX_LENGTH} characters`,
    ),
  captcha: yup.string().required('Please complete the captcha'),
});
