import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Home from './page';

describe('Home Page', () => {
  it('should match snapshot', () => {
    const component = Home();
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });
});
