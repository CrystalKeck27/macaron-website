import React from 'react';
import './App.css';
import {HashRouter as Router, Link, Route, Routes} from "react-router-dom";
import Home from "../Home/Home";
import Order from "../Order/Order";

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <div className='Navigation'>
                        <Link className='PageLink' id='homeLink' to="/">Creations by Bree</Link>
                        <Link className='PageLink' id='orderLink' to="/order">Place Order</Link>
                    </div>

                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/Order" element={<Order/>}/>
                    </Routes>

                </div>
            </Router>
        </div>
    );
}

export default App;
