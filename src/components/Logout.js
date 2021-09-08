import React from 'react'
import logout from './../assets/logout.svg'

import './Logout.scss';

function Logout() {
    return (
        <div className="logout">
             <p>Logout <img src={logout} alt="Logo" /></p>
        </div>
    )
}

export default Logout
