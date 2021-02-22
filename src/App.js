import { useState } from 'react';
import './App.scss';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import LeisureMode from './components/LeisureMode/LeisureMode';
import StrictMode from './components/StrictMode/StrictMode';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faPlay, faPause, faUndo, faPlus, faChevronRight } from '@fortawesome/free-solid-svg-icons'

library.add(faTimes, faPlay, faPause, faUndo, faPlus, faChevronRight);

function App() {
    const [showHome, setShowHome] = useState(true);
    const [showLeisure, setShowLeisure] = useState(true);

    const handleUnmount = () => {
        setShowHome(false);
    }

    return (
        <div className="App">
            { 
                showHome ?
                <Home show={showHome} handleUnmount={handleUnmount}></Home> :
                <div className="app-body">
                    <NavBar setShowLeisure={setShowLeisure} showLeisure={showLeisure}></NavBar>
                    {
                        showLeisure ?
                        <LeisureMode></LeisureMode> :
                        <StrictMode></StrictMode>
                    }
                </div>
            }
                
        </div>
    );
}

export default App;
