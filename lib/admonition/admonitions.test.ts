import { describe, expect, it } from 'vitest';

import { notificationTypes } from './admonitions';

describe('notificationTypes', () => {
  it('should export an array of notification types', () => {
    expect(Array.isArray(notificationTypes)).toBe(true);
    expect(notificationTypes.length).toBeGreaterThan(0);
  });

  it('should contain all 5 notification types', () => {
    expect(notificationTypes).toHaveLength(5);
  });

  it('should have NOTE type', () => {
    const note = notificationTypes.find(type => type.keyword === 'NOTE');
    expect(note).toBeDefined();
    expect(note?.keyword).toBe('NOTE');
    expect(note?.icon).toBeTruthy();
  });

  it('should have IMPORTANT type', () => {
    const important = notificationTypes.find(type => type.keyword === 'IMPORTANT');
    expect(important).toBeDefined();
    expect(important?.keyword).toBe('IMPORTANT');
    expect(important?.icon).toBeTruthy();
  });

  it('should have WARNING type', () => {
    const warning = notificationTypes.find(type => type.keyword === 'WARNING');
    expect(warning).toBeDefined();
    expect(warning?.keyword).toBe('WARNING');
    expect(warning?.icon).toBeTruthy();
  });

  it('should have TIP type', () => {
    const tip = notificationTypes.find(type => type.keyword === 'TIP');
    expect(tip).toBeDefined();
    expect(tip?.keyword).toBe('TIP');
    expect(tip?.icon).toBeTruthy();
  });

  it('should have CAUTION type', () => {
    const caution = notificationTypes.find(type => type.keyword === 'CAUTION');
    expect(caution).toBeDefined();
    expect(caution?.keyword).toBe('CAUTION');
    expect(caution?.icon).toBeTruthy();
  });

  it('should have required properties for all types', () => {
    notificationTypes.forEach(type => {
      expect(type).toHaveProperty('keyword');
      expect(type).toHaveProperty('icon');
      expect(type).toHaveProperty('title');
      expect(typeof type.keyword).toBe('string');
      expect(typeof type.icon).toBe('string');
      expect(typeof type.title).toBe('string');
    });
  });

  it('should have SVG icons', () => {
    notificationTypes.forEach(type => {
      expect(type.icon).toContain('<svg');
      expect(type.icon).toContain('</svg>');
    });
  });

  it('should match snapshot', () => {
    expect(notificationTypes).toMatchSnapshot();
  });
});
