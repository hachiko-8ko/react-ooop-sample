import { useEffect, useEffectEvent } from "react";

/**
 * A custom hook that adds a JS event listener.
 *
 * @param callback The event listener to add
 */
export default function useEventListener<
  TElement extends HTMLElement,
  K extends keyof HTMLElementEventMap | (string & {}),
>(
  element: React.RefObject<TElement | null>,
  type: K,
  callback: (
    ev: K extends keyof HTMLElementEventMap ? HTMLElementEventMap[K] : Event,
  ) => void,
) {
  // Set up vanilla (non-react) JS events, such as for bootstrap. This was far more work than it needed to be.
  const handleEvent = useEffectEvent(callback);
  useEffect(() => {
    // add the events
    const target = element.current;
    if (!target) {
      return;
    }
    target.addEventListener(type as any, handleEvent as any);
    // cleanup after unmounting
    return () => {
      target.removeEventListener(type as any, handleEvent as any);
    };
  }, []);
}
