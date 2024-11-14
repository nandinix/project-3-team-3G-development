// LandingPage.js
import React from "react";
import './LandingPage.css';
import Header from '../components/Header';
import WeatherBox from '../components/WeatherBox';

const LandingPage = () => {
    return (
        <div>
            <Header />
            <div className="landing-page">
                <div className="content-overlay">
                    <h2 className="title">Our Food</h2>
                    <p className="tagline">Chinese Flavors with American Tastes</p>
                    <a href="/menu">
                        <button className="order-now-btn">Order Now</button>
                    </a>
                    
                </div>
                <WeatherBox /> 
            </div>
            
        </div>
    );
};

export default LandingPage;