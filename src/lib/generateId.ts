/**
 * Generates a client-side Builder ID e.g. HH-GOA-042 or HH-GOA-7F29
 */
export function generateBuilderId(): string {
  const num = Math.floor(100 + Math.random() * 900);
  return `HH-GOA-${num}`;
}

export function generateSerialNo(): string {
  const chars = '0123456789ABCDEF';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
