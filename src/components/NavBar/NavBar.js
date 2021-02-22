import './NavBar.scss';

const NavBar = (props) => {
    return (
        <div className="navbar">
            <div className="tabs">
                <div className={props.showLeisure ? "tab selected" : "tab unselected"} onClick={() => props.setShowLeisure(true)}>Leisure</div>
                <div className={!props.showLeisure ? "tab selected" : "tab unselected"} onClick={() => props.setShowLeisure(false)}>Strict</div>
            </div>
            <div className="options"></div>
        </div>
    )
}

export default NavBar;