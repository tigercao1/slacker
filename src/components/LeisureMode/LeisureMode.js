import LeisureCard from '../LeisureCard/LeisureCard';
import './LeisureMode.scss';
import { nanoid } from 'nanoid';
import { useState } from 'react';

const LeisureMode = (props) => {

    const timerObjList = [
        {
            name: "",
            id: nanoid(6),
            type: "work"
        },
        {
            name: "",
            id: nanoid(6),
            type: "slack"
        }
    ]

    const [timerCardList, setTimerCardList] = useState(timerObjList);
    const [currentActiveCardId, setCurrentActiveCardId] = useState(null);
    const [mostRecentAddedCardId, setMostRecentAddedCardId] = useState(null);

    const handleAddCard = (type) => {
        let tempList = [...timerCardList];
        let newCard = {
            name: "",
            id: nanoid(6),
            type: type
        };
        tempList.push(newCard);
        setMostRecentAddedCardId(newCard.id);
        setTimerCardList(tempList);

    }

    const handleCurrentActive = (id) => {
        setCurrentActiveCardId(id);
    }

    const handleNameChange = (id, name) => {
        let tempList = [...timerCardList];
        let targetCard = tempList.find(card => card.id === id);
        targetCard.name = name;
        setTimerCardList(tempList);
        setMostRecentAddedCardId(null);
    }

    return (
        <div className="leisure">
            <div id="work" className="column">
                <div className="title">
                    <span>Work</span>
                    <div className="btn function" onClick={() => handleAddCard("work")}></div>
                </div>
                <div className="body">
                    {
                        timerCardList.map((card, idx) => {
                            return (
                                card.type === "work" &&
                                <LeisureCard 
                                    key={card.id}
                                    name={card.name}
                                    id={card.id}
                                    type={card.type}
                                    handleCurrentActive={handleCurrentActive}
                                    handleNameChange={handleNameChange}
                                    currentActiveCardId={currentActiveCardId}
                                    mostRecentAddedCardId={mostRecentAddedCardId}
                                ></LeisureCard>
                            )
                        })
                    }
                </div>
            </div>
            <div id="slack" className="column">
                <div className="title">
                    <span>Slack</span>
                    <div className="btn function" onClick={() => handleAddCard("slack")}></div>
                </div>
                <div className="body">
                    {
                        timerCardList.map((card) => {
                            return (
                                card.type === "slack" &&
                                <LeisureCard
                                    key={card.id}
                                    id={card.id}
                                    type={card.type}
                                    handleCurrentActive={handleCurrentActive}
                                    handleNameChange={handleNameChange}
                                    currentActiveCardId={currentActiveCardId}
                                    mostRecentAddedCardId={mostRecentAddedCardId}
                                ></LeisureCard>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default LeisureMode;