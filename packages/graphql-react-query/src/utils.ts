import equal from 'fast-deep-equal';
import { MutableRefObject, useMemo, useRef } from 'react';

export function useLatestRef<T>(value: T) {
  const ref = useRef<T | null>(null);
  ref.current = value;
  return ref as MutableRefObject<T>;
}

export function useStableObject<T>(obj: T) {
  const ref = useRef(obj);

  return useMemo(() => {
    const current = ref.current;
    if (obj === current || equal(obj, current)) return current;

    ref.current = obj;
    return obj;
  }, [obj]);
}
