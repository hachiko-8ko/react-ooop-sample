import './ChatCounter.css';

import { useSelector } from 'react-redux';

import { faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { RootState } from "../../global-state/Store";
/**
 * An icon with a badge that shows the number of chats.
 */
export default function ChatCounter() {
  const chats = useSelector((state: RootState) => state.chat.chats);
  return (
    <div className="counter-badge">
      <FontAwesomeIcon icon={faComment} className="badge-icon" />
      {chats.length > 0 && <span className="badge-count">{chats.length}</span>}
    </div>
  );
}
