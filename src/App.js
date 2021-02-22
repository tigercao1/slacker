import { useState } from 'react';
import './App.scss';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import { LeisureTab, StrictTab, UserTab } from './components/Tabs';
import tabs from './utils/tabs'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faPlay, faPause, faUndo, faPlus, faChevronRight, faUser } from '@fortawesome/free-solid-svg-icons'

library.add(faTimes, faPlay, faPause, faUndo, faPlus, faChevronRight, faUser);

function App() {
    const [showHome, setShowHome] = useState(true);
    const [currentTab, setCurrentTab] = useState(tabs.LEISURE);

    const handleUnmount = () => {
        setShowHome(false);
    }

    return (
        <div className="App">
            { 
                showHome ?
                <Home show={showHome} handleUnmount={handleUnmount}></Home> :
                <div className="app-body">
                    <NavBar currentTab={currentTab} setCurrentTab={setCurrentTab}></NavBar>
                    {
                        currentTab === tabs.LEISURE ? <LeisureTab></LeisureTab> :
                        currentTab === tabs.STRICT ? <StrictTab></StrictTab> :
                        currentTab === tabs.USER ? <UserTab></UserTab> : <></>
                    }
                </div>
            }
                
        </div>
    );
}

export default App;
