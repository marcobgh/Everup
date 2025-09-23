import "./ClientList.css"
import { useClientContext } from "../../context";

interface Props {
    onClicked: (type: string, cnpj?: string) => void;
}

function ClientList ({ onClicked }:Props) {

    const { client } = useClientContext()

    return(
        <div className="client-list">
            <div className="clients-header">
                <h1>Listagem de clientes</h1>
                <ul>
                    <li onClick={() => onClicked('create')}>Novo cliente +</li>
                    <li onClick={() => window.location.reload()}><i className="fa-solid fa-arrows-rotate"></i></li>
                </ul>
            </div>
            <table className="client-table">
                <tr>
                    <th>Razão Social</th>
                    <th>CPNJ</th>
                    <th>Situação</th>
                </tr>
                {client.map(client => (
                    <tr key={client.razao}>
                        <td>{client.razao}</td>
                        <td>{client.cnpj}</td>
                        <td>{client.situacao}</td>
                        <td className="view-client-btn"><span onClick={() => {onClicked('viewClient', client.cnpj);}}className="btn-text"><i className="fa-solid fa-square-arrow-up-right"></i> </span></td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default ClientList;