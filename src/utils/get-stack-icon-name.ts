export function getStackIconName(name: string) {
  // Special cases
  if (name === "C++") return "cpp";

  // Replace dots and spaces and / with dashes
  return name.replace(/[./ ]/g, "-").toLowerCase();
}
