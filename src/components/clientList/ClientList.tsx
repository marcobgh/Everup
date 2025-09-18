import "./ClientList.css"
import { useClientContext } from "../../context";

interface Props {
    onSelectedAddNew: (selected: boolean) => void
}

function ClientList ({ onSelectedAddNew }:Props) {

    const { client } = useClientContext()

    return(
        <div className="client-list">
            <div className="clients-header">
                <h1>Listagem de clientes</h1>
                <ul>
                    <li onClick={() => onSelectedAddNew(true)}>Novo cliente +</li>
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
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default ClientList;