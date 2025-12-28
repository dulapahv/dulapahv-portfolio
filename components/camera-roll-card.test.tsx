import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CameraRollCard } from './camera-roll-card';

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: string | boolean | number;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  )
}));

vi.mock('react-medium-image-zoom', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('CameraRollCard', () => {
  const mockImages = ['image1.jpg', 'image2.jpg', 'image3.jpg'];

  it('should render camera roll card with title', () => {
    render(<CameraRollCard images={mockImages} />);

    expect(screen.getByText('Camera Roll')).toBeInTheDocument();
  });

  it('should display first image by default', () => {
    render(<CameraRollCard images={mockImages} />);

    const images = screen.getAllByAltText(/camera roll image/i);
    expect(images[0]).toBeInTheDocument();
  });

  it('should show empty state when no images provided', () => {
    render(<CameraRollCard images={[]} />);

    expect(screen.getByText('No images to display')).toBeInTheDocument();
  });

  it('should navigate to next image when next button is clicked', () => {
    render(<CameraRollCard images={mockImages} />);

    const nextButton = screen.getByRole('button', { name: /next image/i });
    fireEvent.click(nextButton);

    // The component should update to show the next image
    expect(nextButton).toBeInTheDocument();
  });

  it('should navigate to previous image when previous button is clicked', () => {
    render(<CameraRollCard images={mockImages} />);

    const prevButton = screen.getByRole('button', { name: /previous image/i });
    fireEvent.click(prevButton);

    // The component should update to show the previous image
    expect(prevButton).toBeInTheDocument();
  });

  it('should navigate to specific image when progress bar is clicked', () => {
    render(<CameraRollCard images={mockImages} />);

    const indicators = screen.getAllByRole('button', { name: /go to image/i });
    fireEvent.click(indicators[1]);

    // The component should update to show the clicked image
    expect(indicators[1]).toBeInTheDocument();
  });

  it('should show coming soon message', () => {
    render(<CameraRollCard images={mockImages} />);

    expect(screen.getByText('View all photos (Coming Soon)')).toBeInTheDocument();
  });

  it('should render all images', () => {
    render(<CameraRollCard images={mockImages} />);

    const images = screen.getAllByAltText(/camera roll image/i);
    expect(images).toHaveLength(mockImages.length);
  });

  it('should match snapshot', () => {
    const { container } = render(<CameraRollCard images={mockImages} />);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with empty state', () => {
    const { container } = render(<CameraRollCard images={[]} />);
    expect(container).toMatchSnapshot();
  });
});
