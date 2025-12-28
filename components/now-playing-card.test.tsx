import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { NowPlayingCard } from './now-playing-card';

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

const mockTrack = {
  name: 'Test Song',
  artists: [
    {
      id: 'artist-1',
      name: 'Test Artist',
      external_urls: { spotify: 'https://open.spotify.com/artist/1' }
    }
  ],
  album: {
    name: 'Test Album',
    images: [{ url: 'https://example.com/album.jpg' }],
    external_urls: { spotify: 'https://open.spotify.com/album/1' }
  },
  external_urls: {
    spotify: 'https://open.spotify.com/track/123'
  }
};

describe('NowPlayingCard', () => {
  it('should render now playing indicator', () => {
    render(<NowPlayingCard track={mockTrack} />);

    expect(screen.getByText('Now Playing')).toBeInTheDocument();
  });

  it('should display track information', () => {
    render(<NowPlayingCard track={mockTrack} />);

    expect(screen.getByText('Test Song')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
  });

  it('should display album image', () => {
    render(<NowPlayingCard track={mockTrack} />);

    const image = screen.getByAltText('Test Album');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('album.jpg'));
  });

  it('should have link to Spotify', () => {
    render(<NowPlayingCard track={mockTrack} />);

    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute('target', '_blank');
  });

  it('should match snapshot', () => {
    const { container } = render(<NowPlayingCard track={mockTrack} />);
    expect(container).toMatchSnapshot();
  });
});
