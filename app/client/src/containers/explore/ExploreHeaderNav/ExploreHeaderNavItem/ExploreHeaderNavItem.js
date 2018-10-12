import React from 'react';

const exploreHeaderNavItem = (props) => (
    <li onClick={props.clicked}>
        {props.children}
    </li>
);

export default exploreHeaderNavItem;