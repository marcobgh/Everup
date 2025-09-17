import "./Sidebar.css"

interface Props {
    onSelectedOption: (selected: number) => void
}

function Sidebar({ onSelectedOption }: Props) {

    return (
        <div className="sidebar">
            <div>
                <h1>EVERUP</h1>
                <ul>
                    <li onClick={() => onSelectedOption(1)}><i className="fa-solid fa-house"></i>Página inicial</li>
                    <li onClick={() => onSelectedOption(2)}><i className="fa-solid fa-users"></i>Todos os clientes</li>
                    <li onClick={() => onSelectedOption(3)}><i className="fa-solid fa-toolbox"></i>Ações</li>
                    <li onClick={() => onSelectedOption(4)}><i className="fa-solid fa-gear"></i>Configurações</li>
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