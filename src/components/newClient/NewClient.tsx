import { useRef, useState } from 'react';
import { useClientContext } from '../../context';
import './NewClient.css'
import Error from '../error/Error';

interface Props {
    clicked: (type: string) => void;
}

function formatCNPJ(value: string) {
    return value
    .replace(/\D/g, "") // remove tudo que não for número
    .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

function NewClient({ clicked }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const { client, setClient } = useClientContext();

    const [ error, setError ] = useState<string | null>(null)   
    function handleClick() {
        const cnpj = String(inputRef.current?.value);
        if(!cnpj) {
            setError('O campo não pode estar em branco')
        }
        else if(cnpj.length === 14 || cnpj.length === 18)  {
            if(addNewClient()) {
                clicked('close');
            };
        }
        else {setError('O CNPJ deve ter 10 ou 14 caracteres')}
    }

    function addNewClient() {
        const cnpj = formatCNPJ(String(inputRef.current?.value));
    
        if (!client.find(c => c.cnpj === cnpj)) {
            setClient(
                [...client, 
                    {
                        razao: `Empresa ${client.length+1}`,
                        cnpj: cnpj,
                        status: 'Ativo'
                    }
                ]
            )
            return true;
        }
        setError('O CNPJ informado já foi adicionado')
        return false;
    }

    
    return(
        <div className='new-client-container'>
            {error && <Error errorDescription={error}></Error>}

            <form className=''>
                <div className='close-btn' onClick={() => clicked('close')}><i className="fa-solid fa-xmark"></i></div>
                <h1>Adicione novo CNPJ para consulta</h1>
                <label htmlFor='cnpj'>CNPJ:</label>
                <input id='cnpj' type="text" ref={inputRef} />
                <div className='new-client-buttons'>
                    <div className='add-btn' onClick={() => handleClick()}>Adicionar<i className="fa-solid fa-user-plus"></i></div>
                </div>
            </form>

        </div>
    )
}

export default NewClient;