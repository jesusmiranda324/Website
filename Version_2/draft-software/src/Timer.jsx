import {useState, useEffect} from "react";

function Timer() {
    const [time, setTime] = useState(120);
    const [isRunning, setIsRunning] = useState(false);
    useEffect(() => {
       if(!isRunning){
        return;
       }
       
        const timer = setInterval(() => {
            setTime((currentTime) => {
                if(currentTime <= 1){
                    setIsRunning(false);
                    return 0;
            } 
            return currentTime - 1;
        });
    }, 1000);

        return () => clearInterval(timer);
    },[isRunning]);
    return (
        <div className="top">
            <div id="timer">
                <h1 id="time">{time}</h1>

                <div id="buttons">
                    <button onClick= { () => setIsRunning(true)}>Start</button>
                    <button>Set</button>
                    <button onClick= { () => setIsRunning(false)}>Stop</button>
                    <button>Next</button>
                </div>
            </div>
        </div>
    );
}

export default Timer;