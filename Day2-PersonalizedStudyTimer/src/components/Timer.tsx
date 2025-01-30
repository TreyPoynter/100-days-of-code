import { useEffect, useState } from "react";
import { numberFormatter } from "../utils/formattingUtils";

export interface TimerProps {
  currTime: number
}
export default function Timer({currTime}:TimerProps) {
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    const totalSeconds = Math.floor(currTime / 1000); // Convert milliseconds to seconds
    const seconds = totalSeconds % 60; // Get seconds (remaining after minutes)
    const totalMinutes = Math.floor(totalSeconds / 60); // Convert to total minutes
    const minutes = totalMinutes % 60; // Get minutes (remaining after hours)
    const hours = Math.floor(totalMinutes / 60); // Get total hours

    setFormattedTime(`${numberFormatter(hours)} : ${numberFormatter(minutes)} : ${numberFormatter(seconds)}`);
}, [currTime]);

  return(
    <>
      <p className="text-6xl mb-5">
        {
          `${formattedTime}`
        }
      </p>
    </>
  );
}