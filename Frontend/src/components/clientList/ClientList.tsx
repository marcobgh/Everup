import "./ClientList.css"
import { useClientContext } from "../../context";
import { useEffect, useState } from "react";

interface Props {
    onClicked: (type: string, cnpj?: string) => void;
}

interface Client {
    cnpj: string;
    razao_social: string;
    abertura: string;
    tipo: string;
    situacao: string;
    fantasia: string;
}

const URL = 'http://localhost:5001';

function ClientList ({ onClicked }:Props) {

    const [clients, setClients] = useState<Client[]>([]); 
    const [error, setError] = useState<string | null>(null);
    const [sucess, setSucess] = useState<string | null>(null);

    const fetchClients = async () => {
        try{
            const resp = await fetch(`${URL}/clients`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

            if (resp.status === 404) {
                setError('Não foi possível carregar a lista de clientes')
                return;
            }
            
            const data = await resp.json();
            setClients(data);
        }
        catch(err) {
            console.error("Erro ao buscar clientes:", err);
            setError("Erro inesperado ao carregar clientes");
        }
    }

    useEffect(() => {
        fetchClients();
    }, []);
    

    return(
        <div className="client-list">
            <div className="clients-header">
                <h1>Listagem de clientes</h1>
                <ul>
                    <li onClick={() => onClicked('create')}>Novo cliente +</li>
                    <li onClick={fetchClients}><i className="fa-solid fa-arrows-rotate"></i></li>
                </ul>
            </div>
            <table className="client-table">
                <tr>
                    <th>Razão Social</th>
                    <th>CPNJ</th>
                    <th>Situação</th>
                </tr>
                {clients && clients.map(client => (
                    <tr key={client.razao_social}>
                        <td>{client.razao_social}</td>
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