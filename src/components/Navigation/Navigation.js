import React from 'react';
import "./Navigation.css";
import Logo from './Logo/Logo';

const Navigation = ({route,onRouteChange}) => {
    return (
        <nav className='navbar'>
            <Logo />
            <div className="nav1">
            {route==='signin'?
                <p onClick={() => onRouteChange('register')} className="signoutt">Register</p>
                :(route==='register'?
                    <p onClick={() => onRouteChange('signin')} className="signoutt">Sign In</p>
                    :<p onClick={() => onRouteChange('signin')} className="signoutt">Sign Out</p>
                ) 
            }
            </div>
        </nav>
    );
}

export default Navigation;