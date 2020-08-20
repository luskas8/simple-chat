import React, { useState, FormEvent } from 'react';
import io from 'socket.io-client';
import { v4 as uuid} from 'uuid';

import MessegeItem from '../../components/MessegeItem';

import './styles.css';

const mineId = uuid();
const socket = io('http://localhost:3333');
socket.on('connect', () => console.log("[IO] Connect => New connection has been start."));

function Dashboard() {
    const [name, setName] = useState('');
    const [messege, setMessege] = useState('');
    const [messeges, setMessegens] = useState([
        { id: '', messegeId: '', messege: ''}
    ]);

    interface NewMessege {
        id: string;
        messegeId: string;
        messege: string;
    }

    const handleNemMessege = (newMessege: NewMessege) => {
        setMessegens([...messeges, newMessege]);
    }

    socket.on('chat.messege.sent', handleNemMessege);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        
        if(messege.trim()) {
            
            socket.emit('chat.messege', {
                id: mineId,
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
                                                author={(messege.id === mineId) ? "mine" : "other"}
                                                value={messege.messege}
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