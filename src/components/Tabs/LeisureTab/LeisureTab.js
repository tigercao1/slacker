import LeisureList from '../../LeisureList/LeisureList';
import './LeisureTab.scss';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

const LeisureTab = () => {

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

    useEffect(() => {
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

    const leisureList = (type) => {
        return (
            <LeisureList
                type={type}
                handleCurrentActive={handleCurrentActive}
                handleNameChange={handleNameChange}
                currentActiveCardId={currentActiveCardId}
                currentActiveCardType={currentActiveCardType}
                mostRecentAddedCardId={mostRecentAddedCardId}
                updateObjTime={updateObjTime}
                handleDeleteItem={handleDeleteItem}
                handlePauseAll={handlePauseAll}
                handleResetAll={handleResetAll}
                handleAddCard={handleAddCard}
                timerObjList={timerObjList}
                timerCardList={timerCardList}
            ></LeisureList>
        )
    }

    return (
        <div className="leisure">
            {leisureList("work")}
            {leisureList("slack")}
        </div>
    )
};

export default LeisureTab;