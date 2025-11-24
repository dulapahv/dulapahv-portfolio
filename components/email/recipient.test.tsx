import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { RecipientEmailTemplate } from './Recipient';

describe('RecipientEmailTemplate', () => {
  const defaultProps = {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'This is a test message'
  };

  it('should render the email template', () => {
    const { container } = render(<RecipientEmailTemplate {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it('should display the greeting', () => {
    const { container } = render(<RecipientEmailTemplate {...defaultProps} />);
    expect(container.textContent).toContain('Hi DulapahV,');
  });

  it('should display notification message', () => {
    const { container } = render(<RecipientEmailTemplate {...defaultProps} />);
    expect(container.textContent).toContain(
      'You have a new message from the contact form on your portfolio website'
    );
  });

  it('should display sender full name', () => {
    const { container } = render(<RecipientEmailTemplate {...defaultProps} />);
    expect(container.textContent).toContain('Full Name:');
    expect(container.textContent).toContain('John Doe');
  });

  it('should display sender email', () => {
    const { container } = render(<RecipientEmailTemplate {...defaultProps} />);
    expect(container.textContent).toContain('Email:');
    expect(container.textContent).toContain('john@example.com');
  });

  it('should display the message content', () => {
    const { container } = render(<RecipientEmailTemplate {...defaultProps} />);
    expect(container.textContent).toContain('Message:');
    expect(container.textContent).toContain('This is a test message');
  });

  it('should render multiline messages with line breaks', () => {
    const multilineMessage = 'Line 1\nLine 2\nLine 3';
    const { container } = render(
      <RecipientEmailTemplate
        name={defaultProps.name}
        email={defaultProps.email}
        message={multilineMessage}
      />
    );

    const html = container.innerHTML;
    expect(html).toContain('<br>');
  });

  it('should include mailto link for email', () => {
    const { container } = render(<RecipientEmailTemplate {...defaultProps} />);
    const html = container.innerHTML;
    expect(html).toContain('mailto:john@example.com');
  });

  it('should include portfolio link', () => {
    const { container } = render(<RecipientEmailTemplate {...defaultProps} />);
    expect(container.textContent).toContain('DulapahV Portfolio');
  });

  it('should include GitHub link', () => {
    const { container } = render(<RecipientEmailTemplate {...defaultProps} />);
    expect(container.textContent).toContain('GitHub');
  });

  it('should include LinkedIn link', () => {
    const { container } = render(<RecipientEmailTemplate {...defaultProps} />);
    expect(container.textContent).toContain('LinkedIn');
  });

  it('should render with different email addresses', () => {
    const differentEmail = 'test@test.com';
    const { container } = render(
      <RecipientEmailTemplate
        name={defaultProps.name}
        email={differentEmail}
        message={defaultProps.message}
      />
    );
    expect(container.textContent).toContain(differentEmail);
  });

  it('should render with long name', () => {
    const longName = 'John Doe with a very long name that should still render correctly';
    const { container } = render(
      <RecipientEmailTemplate
        name={longName}
        email={defaultProps.email}
        message={defaultProps.message}
      />
    );
    expect(container.textContent).toContain(longName);
  });

  it('should render with long message', () => {
    const longMessage = 'This is a very long message '.repeat(50);
    const { container } = render(
      <RecipientEmailTemplate
        name={defaultProps.name}
        email={defaultProps.email}
        message={longMessage}
      />
    );
    expect(container.textContent).toContain(longMessage);
  });

  it('should handle special characters in message', () => {
    const messageWithSpecialChars = 'Hello! <>&"\'';
    const { container } = render(
      <RecipientEmailTemplate
        name={defaultProps.name}
        email={defaultProps.email}
        message={messageWithSpecialChars}
      />
    );
    expect(container.textContent).toContain('Hello!');
  });

  it('should render preview text with sender name', () => {
    const { container } = render(<RecipientEmailTemplate {...defaultProps} />);
    expect(container.innerHTML).toContain('New message from John Doe');
  });

  it('should match snapshot', () => {
    const { container } = render(<RecipientEmailTemplate {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
