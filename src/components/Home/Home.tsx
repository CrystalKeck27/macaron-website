import React from "react";
import './Home.css';
import background from './explode.webp';

function Home() {
    return <div className='Home'>
        <header className="App-header">
            <h1 className="App-title">Creations by Bree</h1>
        </header>
        <img src={background} alt="Macarons" className="BackgroundImage"/>
    </div>
}

export default Home;