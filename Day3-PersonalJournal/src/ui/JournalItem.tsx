import { JournalEntry } from "./Add"
import './styles/journalItem.css'

interface JournalItemProps extends JournalEntry {
  onClick: () => unknown
}

export default function JournalItem({entry, mood, tag, dateCreated, onClick}: JournalItemProps) {
  return (
    <div className="journal-item" onClick={onClick}>
      <div className="journal-cover">
        <h2 className="journal-title">My Journal</h2>
        <p className="journal-date">{new Date(dateCreated).toDateString()}</p>
        <div className="journal-content">
          <p className="journal-entry">"{entry.substring(0, 100)}..."</p>
        </div>
        <div className="journal-footer">
          <span className="journal-mood">{mood}</span>
          <span className="journal-tag">#{tag}</span>
        </div>
      </div>
    </div>
  );
}