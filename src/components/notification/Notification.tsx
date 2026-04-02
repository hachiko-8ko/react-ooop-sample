import './Notification.css';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from "../../global-state/Store";
/**
 * Always updated with the most-recent response from any chatbot.
 */
export default function Notification() {
  const notification = useSelector(
    (state: RootState) => state.notification.notification,
  );
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (notification) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    notification && (
      <div
        className={`d-none d-md-block text-center notification-message ${pulse ? "notification-pulse" : ""}`}
      >
        {notification}
      </div>
    )
  );
}
