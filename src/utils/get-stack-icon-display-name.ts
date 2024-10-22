const specialCases: Record<string, string> = {
  "shadcn ui": "shadcn/ui",
};

export function getStackIconDisplayName(name: string): string {
  return specialCases[name] || name;
}
