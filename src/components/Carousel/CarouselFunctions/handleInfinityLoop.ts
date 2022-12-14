export const handleInfinityLoop = (index: number, length: number) => {
  if (index < 0) {
    return length + index;
  }
  if (index >= length) {
    return index - length;
  }
  return index;
};


