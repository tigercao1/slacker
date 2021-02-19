import './NavBar.scss';

const NavBar = (props) => {
    return (
        <div className="navbar">
            <div className="navbar-body">
                <div className="tab">Leisure</div>
                <div className="tab">Strict</div>
            </div>
        </div>
    )
}

export default NavBar;