import { useState } from "react";
import "./Sidebar.css"

interface Props {
    onSelectedOption: (selected: string) => void
}

function Sidebar({ onSelectedOption }: Props) {
    const [highlight, setHighlight] = useState<string | null>(null);

    return (
        <div className="sidebar">
            <div>
                <h1>EVERUP</h1>
                <ul>
                    <li onClick={() => {onSelectedOption('home'); setHighlight('home')}} className={(highlight === 'home' ? 'highlight' : '')}><i className="fa-solid fa-house"></i>Página inicial</li>
                    <li onClick={() => {onSelectedOption('clientList'); setHighlight('clientList')}} className={(highlight === 'clientList' ? 'highlight' : '')}><i className="fa-solid fa-users"></i>Todos os clientes</li>
                    <li onClick={() => {onSelectedOption('actions'); setHighlight('actions')}} className={(highlight === 'actions' ? 'highlight' : '')}><i className="fa-solid fa-toolbox"></i>Ações</li>
                    <li onClick={() => {onSelectedOption('settings'); setHighlight('settings')}} className={(highlight === 'settings' ? 'highlight' : '')}><i className="fa-solid fa-gear"></i>Configurações</li>
                </ul>
            </div>
            <div className="logged-user">
                <span className="user-name">
                    <i className="fa-solid fa-user"></i> 
                    Marco Borghetti
                    <i className="fa-solid fa-right-from-bracket"></i>
                </span>
            </div>
        </div>
    )
}

export default Sidebar;