import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ConfirmationEmailTemplate } from './Confirmation';

describe('ConfirmationEmailTemplate', () => {
  const defaultProps = {
    name: 'John Doe',
    message: 'This is a test message'
  };

  it('should render the email template', () => {
    const { container } = render(<ConfirmationEmailTemplate {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it('should display the recipient name', () => {
    const { container } = render(<ConfirmationEmailTemplate {...defaultProps} />);
    expect(container.textContent).toContain('Hi John Doe,');
  });

  it('should display the confirmation message', () => {
    const { container } = render(<ConfirmationEmailTemplate {...defaultProps} />);
    expect(container.textContent).toContain(
      'Thank you for reaching out to me! I have received your message'
    );
  });

  it('should display the user message', () => {
    const { container } = render(<ConfirmationEmailTemplate {...defaultProps} />);
    expect(container.textContent).toContain('Your message:');
    expect(container.textContent).toContain('This is a test message');
  });

  it('should render multiline messages with line breaks', () => {
    const multilineMessage = 'Line 1\nLine 2\nLine 3';
    const { container } = render(
      <ConfirmationEmailTemplate name="Jane Doe" message={multilineMessage} />
    );

    const html = container.innerHTML;
    expect(html).toContain('<br>');
  });

  it('should include portfolio link', () => {
    const { container } = render(<ConfirmationEmailTemplate {...defaultProps} />);
    expect(container.textContent).toContain('DulapahV Portfolio');
  });

  it('should include GitHub link', () => {
    const { container } = render(<ConfirmationEmailTemplate {...defaultProps} />);
    expect(container.textContent).toContain('GitHub');
  });

  it('should include LinkedIn link', () => {
    const { container } = render(<ConfirmationEmailTemplate {...defaultProps} />);
    expect(container.textContent).toContain('LinkedIn');
  });

  it('should render with long name', () => {
    const longName = 'John Doe with a very long name that should still render correctly';
    const { container } = render(
      <ConfirmationEmailTemplate name={longName} message={defaultProps.message} />
    );
    expect(container.textContent).toContain(longName);
  });

  it('should render with long message', () => {
    const longMessage = 'This is a very long message '.repeat(50);
    const { container } = render(
      <ConfirmationEmailTemplate name={defaultProps.name} message={longMessage} />
    );
    expect(container.textContent).toContain(longMessage);
  });

  it('should handle special characters in message', () => {
    const messageWithSpecialChars = 'Hello! <>&"\'';
    const { container } = render(
      <ConfirmationEmailTemplate name={defaultProps.name} message={messageWithSpecialChars} />
    );
    expect(container.textContent).toContain('Hello!');
  });

  it('should render preview text', () => {
    const { container } = render(<ConfirmationEmailTemplate {...defaultProps} />);
    expect(container.innerHTML).toContain('Confirmation of your message');
  });

  it('should match snapshot', () => {
    const { container } = render(<ConfirmationEmailTemplate {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
