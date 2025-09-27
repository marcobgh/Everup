import { useEffect, useState } from 'react';
import './ViewClient.css'
import DeleteClient from '../deleteClient/DeleteClient';
import { useUi } from '../../contexts/AlertContext';


interface Props {
    clicked: (type: string) => void;
    cnpj: string;
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


function ViewClient({ clicked, cnpj }: Props) {
    const formattedCNPJ = cnpj.replace(/\D/g, '')

    const [ client, setClient ] = useState<Client | null>(null);
    const [deleteClient, setDeleteClient] = useState(false)
    const { showAlert } = useUi();

    function onClick(choice: string) {
        if(choice === 'cancel'){ 
            setDeleteClient(false)
        }
        else if (choice === 'delete') {
            onDelete()
            setDeleteClient(false)
            clicked('clientList')
        }
    }

    const findClient = async () => {
        try {
            const resp = await fetch(`${URL}/client/${formattedCNPJ}`, {
                headers: { 'Accept': 'application/json' },
            });
            
            if (!resp.ok) {
                showAlert('Não foi possível carregar o cadastro do cliente', 'error')
                return;
            }
            const data = await resp.json();
            setClient(data); 
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        findClient();
    }, [])


    const onDelete = async () => {
        try {
            const resp = await fetch(`${URL}/client/${formattedCNPJ}`, {
                method: 'DELETE',
            });

            if (!resp.ok) {
                showAlert('Não foi possível deletar o cadastro do cliente', 'error');
            }
            showAlert("Cliente deletado com sucesso", 'success');
        }
        catch (err) {
            console.log(err)
        }
    }

    const reconsult = async () => {
        try {
            const resp = await fetch(`${URL}/client/${formattedCNPJ}`, {
                method: 'PUT',
            });

            if (!resp.ok) {
                showAlert('Não foi possível realizar a reconsulta', 'error');
            }

            else {
                findClient();
                showAlert("Reconsulta realizada com sucesso!", 'success')
            }
        }

        catch (err) {
            console.log("Deu erro aqui:", err);
        }
    }


    return(
        <div className='view-client-container'>
            <div className='close-btn' onClick={() => {clicked('clientList');}}><i className="fa-solid fa-arrow-left"></i></div>
            <div className="view-client-header">
                <h1>Dados da empresa</h1>
                <div className="view-client-buttons">
                    <button className='reload-btn' onClick={reconsult}> Realizar nova consulta </button>
                    <button className='delete-btn' onClick={() => setDeleteClient(true)}> Excluir <i className="fa-solid fa-trash"></i></button>
                    {deleteClient && <DeleteClient clicked={onClick}></DeleteClient>}
                </div>
            </div>
            <div className='client-info'>
                <div className="grid-item">
                    <label htmlFor="cnpj">Cnpj</label>
                    <span id='cnpj'>{client?.cnpj}</span>
                </div>
                <div className="grid-item">
                    <label htmlFor="razao-social">Razão Social</label>
                    <span id='razao-social'>{client?.razao_social}</span>
                </div>
                <div className="grid-item">
                    <label htmlFor="nome-fantasia">Nome Fantasia</label>
                    <span id='nome-fantasia'>{client?.fantasia}</span>
                </div>
                <div className="grid-item">
                    <label htmlFor="fundacao">Fundação</label>
                    <span id='fundacao'>{client?.abertura}</span>
                </div>
                <div className="grid-item">
                    <label htmlFor="situacao">Situação</label>
                    <span id='situacao'>{client?.situacao}</span>
                </div>
            </div>
        </div>
    )
}

export default ViewClient;