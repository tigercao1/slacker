import { useEffect, useRef, useState } from "react";
import './LeisureCard.scss';

const LeisureCard = (props) => {

    // Convert ten milliseconds to formatted time hh:mm:ss:tt
    const msToTime = (ms) => {
        let pad = (n, z = 2) => ('00' + n).slice(-z);
        return pad(ms/3.6e6 | 0) + ':' + pad((ms%3.6e6)/6e4 | 0) + ':' + pad((ms%6e4)/1000 | 0) + '.' + pad(ms%1000, 3);
    }

    const [id] = useState(props.id);
    const [type, setType] = useState(props.type);
    const [name, setName] = useState(props.name ? props.name : "Time-Card-" + props.id);
    const [milliseconds, setMilliseconds] = useState(0);
    const [time, setTime] = useState(msToTime(0));
    const [timerOn, setTimerOn] = useState(false);
    const timerId = useRef('');
    const nameInput = useRef();

    useEffect(() => {
        if (!timerOn && timerId.current) {
            clearInterval(timerId.current);
        }

        if (timerOn && props.currentActiveCardId !== id) {
            setTimerOn(false);
        }
    }, [timerOn, props.currentActiveCardId, id])

    useEffect(() => {
        if (props.mostRecentAddedCardId && props.mostRecentAddedCardId === id) {
            nameInput.current.focus();
        }
    }, [id, props.mostRecentAddedCardId])

    useEffect(() => {
        setTime(msToTime(milliseconds));
    }, [milliseconds])

    const emitNameChange = () => {
        let currName = nameInput.current.value;
        console.log(currName);
        if (currName && currName !== name) {
            setName(currName);
            props.handleNameChange(id, currName);
        }
    }

    const handleFocus = (e) => {
        e.target.select();
    }

    const handleStart = () => {
        if (!timerOn) {
            props.handleCurrentActive(id);
            setTimerOn(true);
            let startTime = Date.now();
            timerId.current = setInterval(() => {
                setMilliseconds(milliseconds + Math.floor((Date.now() - startTime)));
            }, 10);
        }
    }

    const handlePause = () => {
        setTimerOn(false);
    }

    const handleReset = ()=> {
        setTimerOn(false);
        setMilliseconds(0);
    }

    return (
        <div className="leisure-card">
            <input className="title" 
                ref={nameInput} 
                defaultValue={name}
                onBlur={emitNameChange} 
                onFocus={handleFocus}
            ></input>
            <div className="time">{time}</div>
            <div className="button-group">
                <div className="btn function" onClick={handleStart}>S</div>
                <div className="btn function" onClick={handlePause}>P</div>
                <div className="btn function" onClick={handleReset}>R</div>
            </div>
            <div className="sound"></div>
        </div>
    )
}

export default LeisureCard;