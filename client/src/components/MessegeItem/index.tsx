import React from 'react'

import './styles.css';

interface MessegeProps {
    value: string;
    author: string;
    name: string;
}

const MessegeItem: React.FC <MessegeProps> = (props) => {
    return (
        <li className="messege-item">
            <span className={props.author}>
                <span className="name">
                    {props.name}
                </span>
                {props.value}
            </span>
        </li>
    );
}

export default MessegeItem;