import equal from 'fast-deep-equal';
import { MutableRefObject, useCallback, useMemo, useRef } from 'react';

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

export function useStableCallback<Cb extends (...args: any[]) => unknown>(cb: Cb) {
  const latestCb = useLatestRef(cb);

  return useCallback<Cb>(
    // @ts-expect-error - we don't have strong types for useCallback
    function Callback(...args) {
      return latestCb.current(...args);
    },
    [],
  );
}
