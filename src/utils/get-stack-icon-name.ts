export function getStackIconName(name: string) {
  if (name === "C++") return "cpp";

  return name.replace(/\.| /g, "-").toLowerCase();
}
