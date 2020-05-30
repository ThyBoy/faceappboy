import React from 'react';
import Tilt from 'react-tilt';
import concept from './concept.png';
import './Logo.css'

const Logo = () => {
    return (
        <div className='logobox'>
          <Tilt className="Tilt logo" options={{ max : 55}} style = {{ height: 80, width: 80}}>
            <div className="Tilt-inner"><img alt='logo' src={concept} /></div>
          </Tilt>
          <p className='logoname'>Smart Face App</p>
        </div>
    );
}

export default Logo;