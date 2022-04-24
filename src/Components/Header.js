import React from 'react';
import './Header.css'

function Header(props) {
    return ( <>
    <div className="header">Finding Falcone!</div>
    <div className='header-buttons'>
        <input type="button" value="Reset" onClick={() => props.reset()} />
        <span className='line' />
        <a href='https://www.geektrust.com/'>
            <input type="button" value="GeekTrust Home" />
        </a>
    </div>
    </> );
}

export default Header;