import LeisureCard from '../LeisureCard/LeisureCard';
import './LeisureMode.scss';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useState } from 'react';
import utils from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LeisureMode = (props) => {

    const localTimerCards = JSON.parse(localStorage.getItem("timerCards"));

    const timerObjList = localTimerCards ? localTimerCards : [
        {
            name: "",
            id: nanoid(6),
            time: 0,
            type: "work"
        },
        {
            name: "",
            id: nanoid(6),
            time: 0,
            type: "slack"
        }
    ];

    const [timerCardList, setTimerCardList] = useState(timerObjList);
    const [currentActiveCardId, setCurrentActiveCardId] = useState(null);
    const [currentActiveCardType, setCurrentActiveCardType] = useState(null);
    const [mostRecentAddedCardId, setMostRecentAddedCardId] = useState(null);
    const [totalWorkTime, setTotalWorkTime] = useState(utils.calculateTotalTime(timerObjList, "work"));
    const [totalSlackTime, setTotalSlackTime] = useState(utils.calculateTotalTime(timerObjList, "slack"));

    useEffect(() => {
        setTotalWorkTime(utils.calculateTotalTime(timerCardList, "work"))
        setTotalSlackTime(utils.calculateTotalTime(timerCardList, "slack"))
        localStorage.setItem("timerCards", JSON.stringify(timerCardList));
    }, [timerCardList])

    const handleAddCard = (type) => {
        let tempList = [...timerCardList];
        let newCard = {
            name: "",
            id: nanoid(6),
            time: 0,
            type: type
        };
        tempList.push(newCard);
        setMostRecentAddedCardId(newCard.id);
        setTimerCardList(tempList);
    };

    const handleCurrentActive = (id, type) => {
        setCurrentActiveCardId(id);
        setCurrentActiveCardType(type);
    };

    const handleNameChange = (id, name) => {
        let tempList = [...timerCardList];
        let targetCard = tempList.find(card => card.id === id);
        targetCard.name = name;
        setTimerCardList(tempList);
        setMostRecentAddedCardId(null);
    };

    const updateTotalTime = (ms, type) => {
        
        if (type === "work") {
            setTotalWorkTime(totalWorkTime + ms);
        } else {
            setTotalSlackTime(totalSlackTime + ms);
        }
    };

    const updateObjTime = (id, ms) => {
        let tempList = [...timerCardList];
        let targetCard = tempList.find(card => card.id === id);
        targetCard.time = ms;
        setTimerCardList(tempList);
    }

    const handleDeleteItem = (id) => {
        let tempList = [...timerCardList];
        setTimerCardList(tempList.filter((item) => {
            return item.id !== id;
        }));
    }

    const handlePauseAll = () => {
        handleCurrentActive(null, null);
    }

    const handleResetAll = (type) => {
        let tempList = [...timerCardList]
        for (let i in tempList) {
            if (tempList[i].type === type) {
                tempList[i].time = 0;
            }
        }
        setTimerCardList(tempList);
    }

    return (
        <div className="leisure">
            <div id="work" className="column">
                <div className="leisure-header">
                    <div className="title">
                        <div className="text">Work</div>
                        <div className="btn function" onClick={() => handleAddCard("work")}><FontAwesomeIcon icon="plus"/></div>
                    </div>
                    <div className="total-time">
                        <div className="time">{utils.msToTime(totalWorkTime)}</div>
                        <div className="btn-group">
                            <div className={currentActiveCardType === "work" ? "btn function" : "btn disabled"} onClick={handlePauseAll}><FontAwesomeIcon icon="pause"/></div>
                            <div className={currentActiveCardType === "work" ? "btn disabled" : "btn function"} onClick={() => handleResetAll("work")}><FontAwesomeIcon icon="undo"/></div>
                        </div>
                    </div>
                </div>
                <div className="body">
                    {
                        timerCardList.map((card) => {
                            return (
                                card.type === "work" &&
                                <LeisureCard 
                                    key={card.id}
                                    name={card.name}
                                    id={card.id}
                                    time={card.time}
                                    type={card.type}
                                    handleCurrentActive={handleCurrentActive}
                                    handleNameChange={handleNameChange}
                                    currentActiveCardId={currentActiveCardId}
                                    currentActiveCardType={currentActiveCardType}
                                    mostRecentAddedCardId={mostRecentAddedCardId}
                                    updateTotalTime={updateTotalTime}
                                    updateObjTime={updateObjTime}
                                    handleDeleteItem={handleDeleteItem}
                                ></LeisureCard>
                            )
                        })
                    }
                </div>
            </div>
            <div id="slack" className="column">
                <div className="leisure-header">
                    <div className="title">
                        <div className="text">Slack</div>
                        <div className="btn function" onClick={() => handleAddCard("slack")}><FontAwesomeIcon icon="plus"/></div>
                    </div>
                    <div className="total-time">
                        <div className="time">{utils.msToTime(totalSlackTime)}</div>
                        <div className="btn-group">
                            <div className={currentActiveCardType === "slack" ? "btn function" : "btn disabled"} onClick={handlePauseAll}><FontAwesomeIcon icon="pause"/></div>
                            <div className={currentActiveCardType === "slack" ? "btn disabled" : "btn function"} onClick={() => handleResetAll("slack")}><FontAwesomeIcon icon="undo"/></div>
                        </div>
                    </div>
                </div>
                <div className="body">
                    {
                        timerCardList.map((card) => {
                            return (
                                card.type === "slack" &&
                                <LeisureCard
                                    key={card.id}
                                    name={card.name}
                                    id={card.id}
                                    time={card.time}
                                    type={card.type}
                                    handleCurrentActive={handleCurrentActive}
                                    handleNameChange={handleNameChange}
                                    currentActiveCardId={currentActiveCardId}
                                    currentActiveCardType={currentActiveCardType}
                                    mostRecentAddedCardId={mostRecentAddedCardId}
                                    updateTotalTime={updateTotalTime}
                                    updateObjTime={updateObjTime}
                                    handleDeleteItem={handleDeleteItem}
                                ></LeisureCard>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
};

export default LeisureMode;