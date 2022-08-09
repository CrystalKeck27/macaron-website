import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Home from "../Home/Home";
import Order from "../Order/Order";

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/order">Order</Link>
                        </li>
                    </ul>

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
