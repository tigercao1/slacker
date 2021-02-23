import { useState } from 'react';
import './Home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Home = (props) => {
    const [render, setRender] = useState(true);

    const onAnimationEnd = () => {
        if (!render) {
            props.handleUnmount();
        }
    }

    const handleUnmount = () => {
        setRender(false);
    };

    return (
        <div 
            className={"home-body " + (render ? "mount" : "unmount")}
            onAnimationEnd={onAnimationEnd}
        >
            <div className="spacer"></div>
            <div className="content">
                <h1>Slacker</h1>
                <div data-cy="home-button" className="btn home" onClick={handleUnmount}><FontAwesomeIcon icon="chevron-right"/></div>
            </div>
        </div>
    );
}

export default Home;