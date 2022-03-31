export function justNumbers(text) {
  const numbers = text.replace(/[^0-9]/g, '');
  return parseInt(numbers);
}
