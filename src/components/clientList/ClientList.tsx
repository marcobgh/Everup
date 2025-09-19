import "./ClientList.css"
import { useClientContext } from "../../context";

interface Props {
    onClicked: (type: string) => void
}

function ClientList ({ onClicked }:Props) {

    const { client } = useClientContext()

    return(
        <div className="client-list">
            <div className="clients-header">
                <h1>Listagem de clientes</h1>
                <ul>
                    <li onClick={() => onClicked('create')}>Novo cliente +</li>
                    <li><i className="fa-solid fa-arrows-rotate"></i></li>
                </ul>
            </div>
            <table className="client-table">
                <tr>
                    <th>Razão Social</th>
                    <th>CPNJ</th>
                    <th>Status</th>
                </tr>
                {client.map(client => (
                    <tr key={client.razao}>
                        <td>{client.razao}</td>
                        <td>{client.cnpj}</td>
                        <td>{client.status}</td>
                        <td className="view-client-btn"><span onClick={() => onClicked('view')}className="btn-text">Abrir</span></td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default ClientList;