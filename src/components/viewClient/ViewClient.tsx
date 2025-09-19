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
        <div>
            <div className='close-btn' onClick={() => clicked('close')}><i className="fa-solid fa-arrow-left"></i></div>
            <div className='view-client-container'>
                <h1>Dados da empresa</h1>
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
                        <span id='nome-fantasia'></span>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="fundacao">Fundação</label>
                        <span id='fundacao'></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewClient;