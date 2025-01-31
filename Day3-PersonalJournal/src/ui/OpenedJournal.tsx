import { JournalEntry } from "./Add";
import './styles/openedJournal.css'

export default function OpenedJournal({ entry, mood, tag, dateCreated }: JournalEntry) {
  return (
    <div className="opened-journal">
      <div className="paper">
        <h1 className="journal-title">Journal Entry</h1>
        <p className="journal-date">{new Date(dateCreated).toDateString()}</p>
        <p className="journal-entry">{entry}</p>
        <div className="journal-footer">
          <span className="journal-mood">Mood: {mood}</span>
          <span className="journal-tag">#{tag}</span>
        </div>
      </div>
    </div>
  );
}