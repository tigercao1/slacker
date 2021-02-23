import { useEffect, useState } from 'react';
import utils from '../../utils/utils';
import LeisureCard from '../LeisureCard/LeisureCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './LeisureList.scss';

const LeisureList = (props) => {

    const type = props.type;

    const [totalTime, setTotalTime] = useState(utils.calculateTotalTime(props.timerObjList, type));

    useEffect(() => {
        setTotalTime(utils.calculateTotalTime(props.timerCardList, type));
    }, [props.timerCardList, type]);

    const updateTotalTime = (ms, type) => {
        setTotalTime(totalTime + ms);
    };

    const cardList = (type) => {
        return (
            props.timerCardList.map((card) => {
                return (
                    card.type === type &&
                    <LeisureCard 
                        key={card.id}
                        name={card.name}
                        id={card.id}
                        time={card.time}
                        type={card.type}
                        handleCurrentActive={props.handleCurrentActive}
                        handleNameChange={props.handleNameChange}
                        currentActiveCardId={props.currentActiveCardId}
                        currentActiveCardType={props.currentActiveCardType}
                        mostRecentAddedCardId={props.mostRecentAddedCardId}
                        updateTotalTime={updateTotalTime}
                        updateObjTime={props.updateObjTime}
                        handleDeleteItem={props.handleDeleteItem}
                    ></LeisureCard>
                )
            })
        )
    }

    return (
        <div id={type} className="column">
            <div className="leisure-header">
                <div className="title">
                    <div data-cy={"list-title-" + type} className="text">{type.charAt(0).toUpperCase() + type.slice(1)}</div>
                    <div data-cy={"add-card-" + type} className="btn function" onClick={() => props.handleAddCard(type)}><FontAwesomeIcon icon="plus"/></div>
                </div>
                <div className="total-time">
                    <div data-cy={"total-time-" + type} className="time">{utils.msToTime(totalTime)}</div>
                    <div className="btn-group">
                        <div 
                            data-cy={"pause-all-" + type}
                            className={props.currentActiveCardType === type ? "btn function" : "btn disabled"} 
                            onClick={props.handlePauseAll}
                        >
                            <FontAwesomeIcon icon="pause"/>
                        </div>
                        <div 
                            data-cy={"reset-all-" + type}
                            className={props.currentActiveCardType === type ? "btn disabled" : "btn function"} 
                            onClick={() => props.handleResetAll(type)}
                        >
                            <FontAwesomeIcon icon="undo"/>
                        </div>
                    </div>
                </div>
            </div>
            <div data-cy={"leisure-card-list-" + type} className="body">
                { cardList(type) }
            </div>
        </div>
    )
}

export default LeisureList;