import { useRef, useState } from 'react';
import { useClientContext } from '../../context';
import './NewClient.css'
import Error from '../popup/Error';
import Sucess from '../popup/Sucess';

interface Props {
    clicked: (type: string) => void;
}

const URL = 'http://localhost:5001';

function formatCNPJ(value: string) {
    return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

function NewClient({ clicked }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [sucess, setSucess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); 

    const handleClick = async () => {
        setError(null);

        const raw = String(inputRef.current?.value || '').trim();
        const cnpj = raw.replace(/\D/g, '');
        if (!raw) {
            setError('O campo não pode estar em branco');
            return;
        }

        // aceita digitado com/sem máscara
        
        if (cnpj.length !== 14) {
            setError('O CNPJ deve ter 14 dígitos');
            return;
        }
        
        setIsLoading(true);
        const clientExists =  await findClient(cnpj);

        if (clientExists) {
            setError('O CNPJ informado já está cadastrado')
            setIsLoading(false);
            return;
        }

        const ok = await addNewClient(cnpj);

        if (ok) {
            setSucess("Cliente adicionado com sucesso!");
            clicked('close');
        }

    };

    const findClient = async (rawCnpj: string) => {
        try {
            const resp = await fetch(`${URL}/client/${rawCnpj}`, {
                headers: { 'Accept': 'application/json' },
            });
            
            if (resp.status === 404) {
                return false;
            }
            return true;
        }   
        catch (err) {
            setError('Não foi possível consultar a base de dados');
        }
    }

    const addNewClient = async (rawCnpj: string): Promise<boolean> => {

    try {
        setIsLoading(true);

        const resp = await fetch(`${URL}/consult`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cnpj: rawCnpj }),
        });

        if (resp.status === 429) {
            setError('Tente novamente mais tarde')
        }

        if (!resp.ok) {
                console.log(resp)
                setError('Falha na consulta');
                return false;
        }

        return true;
        
    } catch (e) {
        console.log(e)
        setError('Erro inesperado ao consultar');
        return false;
    } finally {
        setIsLoading(false);
    }
  };

    
    return(
        <div className='new-client-container'>
            {error && <Error errorDescription={error}></Error>}
            {sucess && <Sucess popupDescription={sucess}></Sucess>}
            <form className=''>
                <div className='close-btn' onClick={() => clicked('close')}><i className="fa-solid fa-xmark"></i></div>
                <h1>Adicione novo CNPJ para consulta</h1>
                <label htmlFor='cnpj'>CNPJ:</label>
                <input id='cnpj' type="text" ref={inputRef}  placeholder='00.000.000/0000-00 ou só números' />
                <div className='new-client-buttons'>
                    <div className='add-btn' onClick={() => handleClick()}>{isLoading ? 'Consultando...' : 'Adicionar'}<i className="fa-solid fa-user-plus"></i></div>
                </div>
            </form>
        </div>
    )
}

export default NewClient;