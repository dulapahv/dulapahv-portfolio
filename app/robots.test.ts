import { describe, expect, it } from 'vitest';

import robots from './robots';

describe('robots', () => {
  it('should return robots configuration with wildcard user agent', () => {
    const result = robots();

    expect(result.rules).toBeDefined();
    expect(Array.isArray(result.rules)).toBe(true);
    expect(result.rules).toHaveLength(1);

    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const firstRule = rules[0];
    if (firstRule && 'userAgent' in firstRule) {
      expect(firstRule.userAgent).toBe('*');
      expect(firstRule.allow).toBe('/');
    }
  });

  it('should return host URL', () => {
    const result = robots();

    expect(result.host).toBeDefined();
    expect(typeof result.host).toBe('string');
    expect(result.host).toBeTruthy();
  });

  it('should allow all paths for all user agents', () => {
    const result = robots();

    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const firstRule = rules[0];
    if (firstRule && 'allow' in firstRule) {
      expect(firstRule.allow).toBe('/');
    }
  });

  it('should match snapshot', () => {
    const result = robots();
    expect(result).toMatchSnapshot();
  });
});
