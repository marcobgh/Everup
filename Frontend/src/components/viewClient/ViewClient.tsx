import { useState } from 'react';
import { useClientContext } from '../../context';
import './ViewClient.css'

interface Props {
    clicked: (type: string) => void;
    cnpj: string;
}

function ViewClient({ clicked, cnpj }: Props) {

    const { client } = useClientContext();

    const clientFound = client.find( c => c.cnpj === cnpj);

    return(
        <div className='view-client-container'>
            <div className='close-btn' onClick={() => {clicked('clientList');}}><i className="fa-solid fa-arrow-left"></i></div>
            <div className="view-client-header">
                <h1>Dados da empresa</h1>
                <div className="view-client-buttons">
                    <button className='reload-btn'> Realizar nova consulta </button>
                    <button className='delete-btn'> Excluir <i className="fa-solid fa-trash"></i></button>
                </div>
            </div>
            <div className='client-info'>
                <div className="grid-item">
                    <label htmlFor="cnpj">Cnpj</label>
                    <span id='cnpj'>{clientFound?.cnpj}</span>
                </div>
                <div className="grid-item">
                    <label htmlFor="razao-social">Razão Social</label>
                    <span id='razao-social'>{clientFound?.razao}</span>
                </div>
                <div className="grid-item">
                    <label htmlFor="nome-fantasia">Nome Fantasia</label>
                    <span id='nome-fantasia'>{clientFound?.fantasia}</span>
                </div>
                <div className="grid-item">
                    <label htmlFor="fundacao">Fundação</label>
                    <span id='fundacao'>{clientFound?.data_fundacao}</span>
                </div>
            </div>
        </div>
    )
}

export default ViewClient;