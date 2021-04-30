import {Fragment} from 'react';

import Maps from './Map.jsx';

import classes from './Header.module.css'

const Header = props => {
    return (
        <Fragment>
        <header className={classes.header}>
            <h1>MLA Smart Parking</h1>  
        </header>
        <Maps/>
    </Fragment>
    )

};

export default Header;