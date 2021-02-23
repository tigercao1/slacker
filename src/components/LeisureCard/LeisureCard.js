import { useEffect, useRef, useState } from "react";
import './LeisureCard.scss';
import utils from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LeisureCard = (props) => {

    const id = props.id;
    const type = props.type;
    const [name, setName] = useState(props.name ? props.name : "Time-Card-" + props.id);
    const [milliseconds, setMilliseconds] = useState(props.time);
    const [time, setTime] = useState(utils.msToTime(0));
    const [timerOn, setTimerOn] = useState(false);
    const [render, setRender] = useState(true);
    const timerId = useRef(''); // Reference to the timer interval
    const nameInput = useRef();

    useEffect(() => {
        // Clear interval on timer pause
        if (!timerOn && timerId.current) {
            clearInterval(timerId.current);
        }

        // When the current active timer card is not the current card, pause the timer on the current card
        // To achieve when starting another card, the previous running card is paused
        if (timerOn && props.currentActiveCardId !== id) {
            setTimerOn(false);
            // To update the time for the current timer object
            props.updateObjTime(id, milliseconds)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timerOn, props.currentActiveCardId, id])

    useEffect(() => {
        // When this card is the current active card, focus on the name input
        // To give the user the ability to edit card name on add
        if (props.mostRecentAddedCardId && props.mostRecentAddedCardId === id) {
            nameInput.current.focus();
        }
    }, [id, props.mostRecentAddedCardId])

    useEffect(() => {
        // Setting the display time
        setTime(utils.msToTime(milliseconds));
    }, [milliseconds])

    useEffect(() => {
        // Since time is stored as milliseconds
        // Trigger rerender when the timer object is updated to avoid sychornization issues
        setMilliseconds(props.time);
    }, [props.time])

    const emitNameChange = () => {
        let currName = nameInput.current.value;
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
            props.handleCurrentActive(id, type);
            setTimerOn(true);
            // Get initial time
            let startTime = Date.now();
            // Check current time against the initial time, update every 10 ms
            timerId.current = setInterval(() => {
                let time = Math.floor((Date.now() - startTime))
                setMilliseconds(milliseconds + time);
                // Update the accumulated total time
                props.updateTotalTime(time, type)
            }, 10);
        }
    }

    const handlePause = () => {
        setTimerOn(false);
        props.handleCurrentActive(null, null);
        // Update timer object on pause
        props.updateObjTime(id, milliseconds)
    }

    const handleDeleteItem = () => {
        // Render triggers element class change for an unmount animation
        setRender(false);
    }

    const handleKeypress = (e) => {
        let currName = name;
        // Handle Enter keypress
        if (e.keyCode === 13) {
            nameInput.current.blur();
        // Handle Escape keypress
        } else if (e.keyCode === 27) {
            nameInput.current.value = currName;
            nameInput.current.blur();
        }
    }

    const handleAnimationEnd = () => {
        // Actual delete item logic on animation end
        if (!render) {
            props.handleDeleteItem(id);
        }
    }

    return (
        <div className={"leisure-card " + (render ? "mount" : "unmount")} onAnimationEnd={handleAnimationEnd}>
            <FontAwesomeIcon 
                data-cy="delete"
                icon="times" 
                className={!timerOn && props.currentActiveCardType !== type ? "delete function" : "delete disabled"} 
                onClick={handleDeleteItem}
            />
            <input
                data-cy="name"
                className="card-title" 
                ref={nameInput} 
                defaultValue={name}
                onBlur={emitNameChange} 
                onFocus={handleFocus}
                onKeyDown={handleKeypress}
            ></input>
            <div className="time-group">
                <div data-cy="time" className="time">{time}</div>
                {
                    timerOn ?
                    <div data-cy="pause" className="btn function" onClick={handlePause}><FontAwesomeIcon icon="pause"/></div> :
                    <div data-cy="play" className="btn function" onClick={handleStart}><FontAwesomeIcon icon="play"/></div>
                }
            </div>
            <div data-cy="notify" className="sound">Notify</div>
        </div>
    )
}

export default LeisureCard;