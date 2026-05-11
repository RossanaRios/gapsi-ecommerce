/**
 * DESIGN PATTERN: Observer Pattern
 *
 * Wraps the native IntersectionObserver API into a React hook.
 * Components "observe" a DOM element y reaccionan cuando entra al viewport —
 * sin polling ni event listeners manuales de scroll.
 *
 * Usado en:
 *  - ProductCard: fade-in animation cuando la card entra al viewport
 */

import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

interface UseIntersectionObserverOptions {
  onIntersect: () => void;
  enabled?: boolean;
  threshold?: number;
  root?: RefObject<Element | null>;
}

export function useIntersectionObserver({
  onIntersect,
  enabled = true,
  threshold = 0.1,
  root,
}: UseIntersectionObserverOptions) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Guardamos onIntersect en un ref para que el observer no se reconecte
  // cada vez que cambia — evita el loop infinito de carga
  const onIntersectRef = useRef(onIntersect);
  useEffect(() => {
    onIntersectRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersectRef.current();
        }
      },
      { threshold, root: root?.current ?? null }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [enabled, threshold, root]); // onIntersect NO es dependencia — usamos el ref

  return ref;
}
