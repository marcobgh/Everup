import "./Sidebar.css"

function Sidebar() {
    return (
        <div className="sidebar">
            <div>
                <h1>EVERUP</h1>
                <ul>
                    <li><i className="fa-solid fa-house"></i>Página inicial</li>
                    <li><i className="fa-solid fa-users"></i>Todos os clientes</li>
                    <li><i className="fa-solid fa-toolbox"></i>Ações</li>
                    <li><i className="fa-solid fa-gear"></i>Configurações</li>
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