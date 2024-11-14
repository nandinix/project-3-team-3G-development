import React from 'react';
import './CustomerMenuPage.css';
import Header from '../components/Header';
import bowlImage from '../assets/bowl.jpg';
import plateImage from '../assets/plate.jpg';
import biggerPlateImage from '../assets/bigplate.jpg';

function CustomerMenuPage() {
    return (
    <div>
        <Header />
        <div className="menu-container">
            <main className="main-content">
                <h2 className="tagline">WE WOK FOR YOU</h2>
                <p className="instruction">Choose meal type to get started</p>
                <div className="menu-options">
                    <div className="menu-item">
                        <img src={bowlImage} alt="Bowl" className="menu-image" />
                        <p className="menu-description">Bowl: 1 side, 1 entree</p>
                    </div>
                    <div className="menu-item">
                        <img src={plateImage} alt="Plate" className="menu-image" />
                        <p className="menu-description">Plate: 1 side, 2 entrees</p>
                    </div>
                    <div className="menu-item">
                        <img src={biggerPlateImage} alt="Bigger Plate" className="menu-image" />
                        <p className="menu-description">Bigger Plate: 1 side, 3 entrees</p>
                    </div>
                </div>
            </main>
        </div>
        </div>
    );
}

export default CustomerMenuPage;
