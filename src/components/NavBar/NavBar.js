import './NavBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tabs from './../../utils/tabs';

const NavBar = (props) => {

    const handleShowTab = (tab) => {
        props.setCurrentTab(tab);
    }

    return (
        <div className="navbar">
            <div className="tabs">
                <div
                    data-cy="leisure-tab"
                    className={props.currentTab === tabs.LEISURE ? "tab selected" : "tab unselected"} 
                    onClick={() => handleShowTab(tabs.LEISURE)}
                >
                    Leisure
                </div>
                <div 
                    data-cy="strict-tab"
                    className={props.currentTab === tabs.STRICT ? "tab selected" : "tab unselected"} 
                    onClick={() => handleShowTab(tabs.STRICT)}
                >
                    Strict
                </div>
            </div>
            <div className="options">
                <div
                    data-cy="user-tab"
                    className={props.currentTab === tabs.USER ? "user-icon selected" : "user-icon unselected"} 
                    onClick={() => handleShowTab(tabs.USER)}
                >
                    <FontAwesomeIcon icon="user"/>
                </div>
            </div>
        </div>
    )
}

export default NavBar;