import {Fragment} from 'react';

import Maps from './Map.jsx';

import classes from './Header.module.css'

const Header = props => {
    return (
        <Fragment>
        <header className={classes.header}>
            <h1>MLA Smart Parking</h1>  
            <button onClick={props.logout}>Logout</button>
        </header>
        {/*<Maps/>*/}
    </Fragment>
    )

};

export default Header;