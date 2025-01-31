import { useEffect, useState } from 'react';
import './styles/app.css'
import Modal from './Modal';
import Button from './Button';
import Add from './Add';
import { JournalEntry } from './Add';
import JournalItem from './JournalItem';
import OpenedJournal from './OpenedJournal';

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [openJournal, setOpenJournal] = useState<JournalEntry | null>(null);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    refershEntries();
  }, []);

  function displayJournalEntry(index: number) {
    setOpenJournal(journalEntries[index]);
    setIsJournalOpen(true);
  }

  function refershEntries() {
    if(!localStorage.getItem('journalEntries')) return;
    // @ts-ignore
    const entries = JSON.parse(localStorage.getItem('journalEntries')) as JournalEntry[];
    setJournalEntries(entries);
    setIsAddModalOpen(false);
  }

  return (
    <>
      <div id='header'>
        <Button text='Add' onClick={() => setIsAddModalOpen(p => !p)}/>
      </div>
      <ul className="journals">
        {
          journalEntries.map((v, i) => {
            return(
              <JournalItem key={i} onClick={() => displayJournalEntry(i)} 
              tag={v.tag} mood={v.mood} entry={v.entry} dateCreated={v.dateCreated} />
            )
          })
        }
      </ul>

      {/* ADD MODAL */}
      <Modal onClose={() => setIsAddModalOpen(false)} isOpen={isAddModalOpen}>
        <Add onAdd={() => refershEntries()}/>
      </Modal>

      {/* JOURNAL MODAL */}
      <Modal onClose={() => setIsJournalOpen(false)} isOpen={isJournalOpen}>
        <OpenedJournal 
          entry={openJournal?.entry ?? ''}
          mood={openJournal?.mood ?? ''}
          dateCreated={openJournal?.dateCreated ?? ''}
          tag={openJournal?.tag ?? ''}
        />
      </Modal>
    </>
  );
}

export default App
