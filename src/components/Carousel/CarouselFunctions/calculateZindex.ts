/**
 * Calculate z-index for element in carousel.
 * @param index - index of element in carousel
 * @param activeIndex - index of active element in carousel
 * @param length - no of elements in carousel
 * @returns - z-index for element as number
 */

export const calculateZindex = (index: number, activeIndex: number, length: number): number => {
  if (index === activeIndex) {
    return length;
  }
  return length - Math.abs(index - activeIndex);
};
