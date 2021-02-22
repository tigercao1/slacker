import { useState } from 'react';
import './App.scss';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import LeisureMode from './components/LeisureMode/LeisureMode';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faPlay, faPause, faUndo, faPlus, faChevronRight } from '@fortawesome/free-solid-svg-icons'

library.add(faTimes, faPlay, faPause, faUndo, faPlus, faChevronRight);

function App() {
    const [showHome, setShowHome] = useState(true);

    const handleUnmount = () => {
        setShowHome(false);
    }

    return (
        <div className="App">
            { 
                showHome ?
                <Home show={showHome} handleUnmount={handleUnmount}></Home> :
                <div className="app-body">
                    <NavBar></NavBar>
                    <LeisureMode></LeisureMode>
                </div>
            }
                
        </div>
    );
}

export default App;
