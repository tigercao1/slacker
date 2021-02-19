import { useEffect, useState } from 'react';
import './Home.scss';

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
                <div className="btn home" onClick={handleUnmount} data-hover="Get Slacking">&#8680;</div>
            </div>
        </div>
    );
}

export default Home;