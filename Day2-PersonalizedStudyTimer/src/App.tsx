import { useState, useEffect, useRef } from "react"
import Button from "./components/Button";
import { getUTCTimes } from "./utils/dateUtils";
import { writeToLocalStorage, getFromLocalStorage } from "./utils/localStorageUtils";
import selectableTimes from "./utils/selectableTimes";
import Timer from "./components/Timer";

function App() {

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerGoing, setTimerGoing] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [timeStartAt, setTimeStartAt] = useState<number>(0);
  const [timeEndAt, setTimeEndAt] = useState<number>(0);
  const [selectedTimeOffset, setSelectedTimeOffset] = useState(selectableTimes[0]);
  const intervalRef = useRef(null);
  const [buttonText, setButtonText] = useState('Start Timer');
  const [workCompleted, setWorkCompleted] = useState(0);

  const startTimer = () => {
    let utcStartTime = 0, utcEndTime = 0;
    setTimerStarted(true);

    if (isWorkTime) {
      const { startTime, endTime } = getUTCTimes(new Date(), selectedTimeOffset.work.hours,
        selectedTimeOffset.work.minutes, selectedTimeOffset.work.seconds);
      utcStartTime = startTime;
      utcEndTime = endTime;
    }
    else {
      const { startTime, endTime } = getUTCTimes(new Date(), selectedTimeOffset.break.hours,
        selectedTimeOffset.break.minutes, selectedTimeOffset.break.seconds);
      utcStartTime = startTime;
      utcEndTime = endTime;
    }

    setTimeStartAt(utcStartTime);
    setTimeEndAt(utcEndTime);

    if (!timerStarted) {
      setTimeLeft(utcEndTime - utcStartTime);
    }

    if (!timerGoing) {
      continueTimer();
    }
  };

  const continueTimer = () => {
    setTimerGoing(true);
    intervalRef.current = setInterval(() => {  // decrement time by 1 second (1000 ms)
      setTimeLeft(prevValue => {
        if (prevValue <= 0) {
          clearInterval(intervalRef.current);
          setTimeLeft(0); // Avoid setting null unless handled in UI
          
          setIsWorkTime(prev => {
            const newIsWorkTime = !prev;
            setButtonText(!newIsWorkTime ? 'Start Break' : 'Start Timer');
            setTimerStarted(false);
            setTimerGoing(false);

            if(!newIsWorkTime)
              incrementWorkCompleted();

            const { startTime, endTime } = getUTCTimes(
              new Date(),
              !newIsWorkTime ? selectedTimeOffset.break.hours : selectedTimeOffset.work.hours,
              !newIsWorkTime ? selectedTimeOffset.break.minutes : selectedTimeOffset.work.minutes,
              !newIsWorkTime ? selectedTimeOffset.break.seconds : selectedTimeOffset.work.seconds
            );

            setTimeStartAt(startTime);
            setTimeEndAt(endTime);

            return newIsWorkTime;
          });

          return null; // Ensure it doesn't go negative
        }
        return prevValue - 1000;
      });
    }, 1000);
  }

  const pauseTimer = () => {
    if (timerGoing) {
      clearInterval(intervalRef.current ?? 0);
      setTimerGoing(false);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const { startTime, endTime } = getUTCTimes(new Date(), selectedTimeOffset.work.hours,
      selectedTimeOffset.work.minutes, selectedTimeOffset.work.seconds);
    setTimeStartAt(startTime);
    setTimeEndAt(endTime);

    if(getFromLocalStorage('deleteAt') <= new Date().getDate()) {
      localStorage.removeItem('deleteAt');
      localStorage.removeItem('workCompleted');
    }

    if(!getFromLocalStorage('workCompleted')) {
      writeToLocalStorage('workCompleted', 0);
      const tom = new Date();
      writeToLocalStorage('deleteAt', tom.getDate() + 1)
      setWorkCompleted(0);
    }
    else {
      const currWork = getFromLocalStorage('workCompleted');
    if(!currWork)
      return;
    const pastWorkNum = Number.parseInt(currWork);
    setWorkCompleted(pastWorkNum);
    }
  }, []);

  function incrementWorkCompleted() {
    const pastWork = getFromLocalStorage('workCompleted');
    if(!pastWork)
      return;
    let pastWorkNum = Number.parseInt(pastWork);
    pastWorkNum += 1;
    setWorkCompleted(pastWorkNum);
    writeToLocalStorage('workCompleted', pastWorkNum);
  }

  function onButtonClick() {
    setTimerGoing(prevValue => !prevValue);
    

    if (!timerStarted) {  // start
      setButtonText('Pause Timer');
      startTimer();
    }
    else if (timerGoing && timeStartAt && timeEndAt) {  // pause
      setButtonText('Continue Timer');
      pauseTimer();
    }
    else if (!timerGoing) {
      continueTimer();
      setButtonText('Pause Timer');
    }
  }

  return (
    <>
      <div className="bg-blue-200">
        <p className="text-2xl">Work Sessions Completed: {workCompleted}</p>
      </div>
      <div className={`h-screen flex items-center justify-center flex-col bg-blue-200`}>
        <h1 className="text-4xl mb-3">
          {
            isWorkTime ?
              "Work Time" :
              "Break Time"
          }
        </h1>
        <Timer currTime={timeLeft ?? (timeEndAt - timeStartAt)} />
        <Button text={buttonText} onClick={() => onButtonClick()} />
      </div>
    </>
  );
}

export default App
