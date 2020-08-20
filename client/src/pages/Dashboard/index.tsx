import React, { useState, FormEvent } from 'react';
import io from 'socket.io-client';
import * as uuid from 'uuid';

import MessegeItem from '../../components/MessegeItem';

import './styles.css';

const mineId = uuid.v4();
const socket = io('http://localhost:3333');
socket.on('connect', () => console.log("[IO] Connect => New connection has been start."));

function Dashboard() {
    const [messege, setMessege] = useState('');
    const [name, setName] = useState('');
    const [messeges, setMessegens] = useState([
        { author: '', messegeId: '', messege: '', authorName: '' }
    ]);

    interface NewMessege {
        author: string;
        messegeId: string;
        messege: string;
        authorName: string;
    }

    const handleNemMessege = (newMessege: NewMessege) => {
        setMessegens([...messeges, newMessege]);
    }

    socket.on('chat.messege.sent', handleNemMessege);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        
        if(messege.trim()) {
            
            socket.emit('chat.messege', {
                author: mineId,
                authorName: name,
                messege
            })
            setMessege('');
        }
    }
    return (
        <div className="container">
            <div className="dashboard-content">
                <div className="user">
                    <label htmlFor="name">Username</label>
                    <input type="text" id="name" value={name} onChange={evt => {setName(evt.target.value)}}/>
                </div>

                <div className="chat-box">
                    <ul className="messeges-list">
                        {
                            messeges.map(messege => {
                                if (messege.messegeId) {
                                    return <MessegeItem
                                                key={messege.messegeId}
                                                author={(messege.author === mineId) ? "mine" : "other"}
                                                value={messege.messege}
                                                name={messege.authorName}
                                            />
                                }
                                // eslint-disable-next-line
                                return;
                            })
                        }
                    </ul>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="write-space">
                        <div className="input-block">
                            <input
                                type="text"
                                placeholder="Digite uma mensagem..."
                                value={messege}
                                onChange={evt => {setMessege(evt.target.value)}}
                            />
                        </div>
                        <button type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Dashboard;