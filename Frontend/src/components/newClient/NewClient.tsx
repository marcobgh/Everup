import { use, useRef, useState } from 'react';
import { useClientContext } from '../../context';
import './NewClient.css'
import Error from '../error/Error';

interface Props {
    clicked: (type: string) => void;
}

type ConsultaDTO = {
    razao_social: string;
    abertura: string;
    tipo: string;
    cnpj?: string;
};

const URL = 'http://localhost:5001';

function formatCNPJ(value: string) {
    return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

function NewClient({ clicked }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { client, setClient } = useClientContext();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); 

    const handleClick = async () => {
        setError(null);

    const raw = String(inputRef.current?.value || '').trim();
    if (!raw) {
        setError('O campo não pode estar em branco');
        return;
    }

    // aceita digitado com/sem máscara
    const len = raw.replace(/\D/g, '').length;
    if (len !== 14) {
        setError('O CNPJ deve ter 14 dígitos');
        return;
    }

    const ok = await addNewClient(raw);
    if (ok) clicked('close');
  };

  // tornei async e devolve boolean
  const addNewClient = async (rawCnpj: string): Promise<boolean> => {
    const cnpjMasked = formatCNPJ(rawCnpj);
    const exists = client.some((c) => c.cnpj === cnpjMasked);
    if (exists) {
      setError('O CNPJ informado já foi adicionado');
      return false;
    }

    try {
        setIsLoading(true);

        const resp = await fetch(`${URL}/consult`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cnpj: cnpjMasked }),
        });

        if (resp.status === 429) {
            setError('Tente novamente mais tarde')
        }

        if (!resp.ok) {
                console.log(resp)
                setError('Falha na consulta');
                return false;
        }


         const data = (await resp.json()) as ConsultaDTO;

        // use função no setState para evitar condição de corrida
        setClient((prev) => [
            ...prev,
            {
            razao: data.razao_social,       // agora temos certeza que é string
            cnpj: cnpjMasked,
            status: data.tipo,
            fantasia: `Nome fantasia da empresa ${prev.length + 1}`,
            data_fundacao: data.abertura,
            },
        ]);

        return true;
    } catch (e) {
        setError('Erro inesperado ao consultar');
        return false;
    } finally {
        setIsLoading(false);
    }
  };

    
    return(
        <div className='new-client-container'>
            {error && <Error errorDescription={error}></Error>}
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