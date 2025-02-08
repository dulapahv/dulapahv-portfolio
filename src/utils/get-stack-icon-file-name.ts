export function getStackIconFileName(name: string) {
  // Special cases
  if (name === 'C++') return 'cpp';

  // Replace dots and spaces with dashes
  return name.replace(/\.| /g, '-').toLowerCase();
}
