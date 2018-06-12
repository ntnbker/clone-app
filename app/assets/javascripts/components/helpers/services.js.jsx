const trimMaxLength = (str, maxLength) => {
  if (!str) return '';
  if (maxLength == null) return str;
  return str.length > maxLength ? str.slice(0, maxLength - 3) + '...' : str;
}