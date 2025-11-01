import { describe, expect, it } from 'vitest';

import {
  ConfirmationEmailTemplate,
  RecipientEmailTemplate,
  type ConfirmationEmailTemplateProps,
  type RecipientEmailTemplateProps
} from './index';

describe('Email templates exports', () => {
  it('should export ConfirmationEmailTemplate', () => {
    expect(ConfirmationEmailTemplate).toBeDefined();
    expect(typeof ConfirmationEmailTemplate).toBe('function');
  });

  it('should export RecipientEmailTemplate', () => {
    expect(RecipientEmailTemplate).toBeDefined();
    expect(typeof RecipientEmailTemplate).toBe('function');
  });

  it('should export ConfirmationEmailTemplateProps type', () => {
    // Type assertion test - if this compiles, the type is exported correctly
    const props: ConfirmationEmailTemplateProps = {
      name: 'Test',
      message: 'Test message'
    };
    expect(props).toBeDefined();
  });

  it('should export RecipientEmailTemplateProps type', () => {
    // Type assertion test - if this compiles, the type is exported correctly
    const props: RecipientEmailTemplateProps = {
      name: 'Test',
      email: 'test@example.com',
      message: 'Test message'
    };
    expect(props).toBeDefined();
  });
});
