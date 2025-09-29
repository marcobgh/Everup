import "./ClientList.css"
import { useEffect, useState } from "react";
import { useUi } from "../../contexts/AlertContext";


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
    const { showAlert } = useUi();

    const fetchClients = async () => {
        try{
            const resp = await fetch(`${URL}/clients`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

            if (resp.status === 404) {
                showAlert('Não foi possível carregar a lista de clientes', 'error')
                return;
            }
            
            const data = await resp.json();
            setClients(data);
        }
        catch(err) {
            console.error("Erro ao buscar clientes:", err);
            showAlert("Erro inesperado ao carregar clientes", 'error');
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
            {clients && clients.length > 0 ? (
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
                        <td className="view-client-btn"><span className="btn-text"><i onClick={() => {onClicked('viewClient', client.cnpj);}} className="fa-solid fa-square-arrow-up-right"></i> </span></td>
                    </tr>
                ))}
            </table>
            ) : (
                <div className="empty-warning">
                    <i className="fa-regular fa-folder-open empty-icon"></i>
                    <span>A lista de clientes está vazia</span>
                </div>
            )}
        </div>
    )
}

export default ClientList;