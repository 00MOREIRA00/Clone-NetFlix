import React from "react";
import './Header.css';

export default ({black}) => {
    return(
       <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" />
                </a>
            </div>

       <div className="header--user">
            <a href="/">
                    <img src="https://i.pinimg.com/originals/8f/22/d3/8f22d32f54c8d0dd4087b1007af00353.jpg" alt="Usuário" />
            </a>
       </div>

       </header>
    );
}