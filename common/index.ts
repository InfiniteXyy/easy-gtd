export function isTouchDevice() {
  return (
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0)
  );
}

export function sorterBy<T>(pick: (object: T) => boolean | number | string) {
  return (a: T, b: T) => {
    const _a = pick(a);
    const _b = pick(b);
    if (_a < _b) return -1;
    if (_a > _b) return 1;
    return 0;
  };
}