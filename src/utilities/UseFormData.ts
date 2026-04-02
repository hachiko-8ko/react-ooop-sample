import { useState } from "react";
import type { StateDispatcher } from "./StateTypes";

/**
 * A custom hook that creates an updater function that will update
 * the form from JS events (based on "name" matching, no two-way binding at all).
 */
export default function useFormData<T>(
  initialState: T,
): [T, StateDispatcher<T>, (evt: any) => void] {
  const [formData, setFormData] = useState<T>(initialState);
  return [
    formData,
    setFormData,
    // Note: useCallback shouldn't be needed here, as this doesn't trigger any child components
    // (there are none) and this doesn't appear in useEffect().
    (evt: any) => {
      // Warning: In vanilla HTML, not every form can be counted on for "value,"
      // but this project has just a single select and a single input.
      // In a real app, I'd handle checkboxes, radios, and multi-selects.
      const { name, value } = evt.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
  ];
}
