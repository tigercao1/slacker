import { useEffect, useRef, useState } from "react";
import './LeisureCard.scss';
import utils from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LeisureCard = (props) => {

    // Convert ten milliseconds to formatted time hh:mm:ss:tt

    const [id] = useState(props.id);
    const [type, setType] = useState(props.type);
    const [name, setName] = useState(props.name ? props.name : "Time-Card-" + props.id);
    const [milliseconds, setMilliseconds] = useState(props.time);
    const [time, setTime] = useState(utils.msToTime(0));
    const [timerOn, setTimerOn] = useState(false);
    const [render, setRender] = useState(true);
    const timerId = useRef('');
    const nameInput = useRef();

    useEffect(() => {
        if (!timerOn && timerId.current) {
            clearInterval(timerId.current);
        }

        if (timerOn && props.currentActiveCardId !== id) {
            setTimerOn(false);
            props.updateObjTime(id, milliseconds)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timerOn, props.currentActiveCardId, id])

    useEffect(() => {
        if (props.mostRecentAddedCardId && props.mostRecentAddedCardId === id) {
            nameInput.current.focus();
        }
    }, [id, props.mostRecentAddedCardId])

    useEffect(() => {
        setTime(utils.msToTime(milliseconds));
    }, [milliseconds])

    useEffect(() => {
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
            let startTime = Date.now();
            timerId.current = setInterval(() => {
                let time = Math.floor((Date.now() - startTime))
                setMilliseconds(milliseconds + time);
                props.updateTotalTime(time, type)
            }, 10);
        }
    }

    const handlePause = () => {
        setTimerOn(false);
        props.handleCurrentActive(null, null);
        props.updateObjTime(id, milliseconds)
    }

    const handleDeleteItem = () => {
        setRender(false);
    }

    const handleKeypress = (e) => {
        let currName = name;
        if (e.keyCode === 13) {
            nameInput.current.blur();
        } else if (e.keyCode === 27) {
            nameInput.current.value = currName;
            nameInput.current.blur();
        }
    }

    const handleAnimationEnd = () => {
        if (!render) {
            props.handleDeleteItem(id);
        }
    }

    return (
        <div className={"leisure-card " + (render ? "mount" : "unmount")} onTransitionEnd={handleAnimationEnd}>
            <FontAwesomeIcon icon="times" className={!timerOn && props.currentActiveCardType !== type ? "delete function" : "delete disabled"} onClick={handleDeleteItem}/>
            <input className="card-title" 
                ref={nameInput} 
                defaultValue={name}
                onBlur={emitNameChange} 
                onFocus={handleFocus}
                onKeyDown={handleKeypress}
            ></input>
            <div className="time-group">
                <div className="time">{time}</div>
                {
                    timerOn ?
                    <div className="btn function" onClick={handlePause}><FontAwesomeIcon icon="pause"/></div> :
                    <div className="btn function" onClick={handleStart}><FontAwesomeIcon icon="play"/></div>
                }
            </div>
            <div className="sound">Notify</div>
        </div>
    )
}

export default LeisureCard;