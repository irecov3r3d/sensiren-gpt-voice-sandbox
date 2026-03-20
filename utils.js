export function toneDescriptor(v) {
  if (v >= 80) return `${v} (very warm)`;
  if (v >= 60) return `${v} (warm)`;
  if (v >= 40) return `${v} (neutral)`;
  if (v >= 20) return `${v} (blunt)`;
  return `${v} (very blunt)`;
}
