import React, { useState, FormEvent } from 'react';

import './styles.css';
import MessegeItem from '../../components/MessegeItem';

function Dashboard() {
    const [messege, setMessege] = useState('');
    const [messeges, setMessegens] = useState([
        { author: '', messegeId: 0, messege: '' }
    ]);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        
        if(messege.trim()) {
            setMessege('');
            setMessegens([...messeges, {
                author: "mine",
                messegeId: 1,
                messege
            }])
        }
    }
    return (
        <div className="container">
            <div className="dashboard-content">
                <div className="user">
                    <label htmlFor="name">Username</label>
                    <input type="text" id="name"/>
                </div>

                <div className="chat-box">
                    <ul className="messeges-list">
                        {
                            messeges.map(messege => {
                                return (
                                    <MessegeItem key={messege.messegeId} author={messege.author} value={messege.messege}/>
                                )
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