import { useEffect, useState } from "react"
import TextBox from "./Textbox";
import './styles/add.css'
import Dropdown from "./Dropdown";
import Button from "./Button";

export interface JournalEntry {
  tag: string,
  mood: string,
  entry: string,
  dateCreated: string
}

interface AddProps {
  onAdd: () => unknown
}

export default function Add({onAdd} : AddProps) {

  const validTags = [
    'Gratitude',
    'Productivity',
    'Self-Care',
    'Adventure',
    'Creativity',
    'Reflection',
    'Motivation',
    'Stress Relief',
    'Accomplishments',
    'Learning',
    'Relationships',
    'Daily Recap',
    'Challenges',
    'Happiness',
    'Entertainment'
  ]

  const validMoods = [
    {name: 'Reflective', faIcon: 'fa-face-smile'},
    {name: 'Motivated', faIcon: 'fa-face-grimace'},
    {name: 'Silly', faIcon: 'fa-face-grin-tongue-wink'},
    {name: 'Content', faIcon: 'fa-face-smile-beam'},
    {name: 'Overwhelmed', faIcon: 'fa-face-tired'},
    {name: 'Joyful', faIcon: 'fa-face-laugh-beam'},
  ]

  

  const [journalTag, setJournalTag] = useState('');
  const [journalMood, setJournalMood] = useState(validMoods[0].name);
  const [entry, setEntry] = useState('');

  function addEntry() {
    const entryObj: JournalEntry = {
      entry: entry,
      mood: journalMood,
      tag: journalTag,
      dateCreated: new Date().toLocaleDateString()
    }

    if(!localStorage.getItem('journalEntries'))  // make sure storage exists
      localStorage.setItem('journalEntries', JSON.stringify([]))
    
    const currentEntries : JournalEntry[] = JSON.parse(localStorage.getItem('journalEntries'));
    currentEntries.push(entryObj);
    localStorage.setItem('journalEntries', JSON.stringify(currentEntries))
    onAdd();
    

    console.log(entryObj)
  }

  return(
    <>
      <ul id="mood-selection">
        {
          validMoods.map((mood, i) => {
            return(
              <li className={`${mood.name == journalMood ? 'selected' : ''}`} key={i} onClick={() => setJournalMood(mood.name)}>
                <i className={`fa-solid ${mood.faIcon}`}/>
                <p>{mood.name}</p>
              </li>
            )
          })
        }
      </ul>
      <div className="dropdown-container">
        <Dropdown onChange={setJournalTag} placeholder="Select a tag" data={
          validTags.reduce((acc: {key: number, value: string}[], e, i) => {
            acc.push({ key: i, value: e });
            return acc;
          }, [])
        }/>
      </div>
      
      <TextBox onChange={setEntry} isTextArea={true} placeholder="Enter your thoughts.."/>
      <Button onClick={addEntry} text="Add Entry"/>
    </>
  )
}